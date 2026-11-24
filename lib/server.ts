import "server-only";
import crypto from "node:crypto";

/* ------------------------------------------------------------------
 * Server-side validation, CRM hooks and Meta Conversions API.
 * ------------------------------------------------------------------ */

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{8,20}$/;

export function str(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function validateContact(body: Record<string, unknown>) {
  const errors: FieldErrors = {};
  const data = {
    fullName: str(body.fullName, 120),
    email: str(body.email, 160).toLowerCase(),
    whatsapp: str(body.whatsapp, 24),
    country: str(body.country, 80),
  };
  if (data.fullName.length < 2) errors.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(data.whatsapp)) errors.whatsapp = "Please enter a valid WhatsApp number with country code.";
  if (!data.country) errors.country = "Please select your country.";
  return { data, errors };
}

export function sha256(v: string) {
  return crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
}

export type CrmEvent =
  | "lead.created"
  | "enrollment.form_submitted"
  | "checkout.started"
  | "checkout.incomplete"
  | "payment.pending"
  | "payment.verified"
  | "masterclass.registered"
  | "masterclass.attended"
  | "masterclass.missed"
  | "consultation.requested"
  | "resource.downloaded";

/**
 * Sends an event to the CRM / automation platform. The receiving workflow decides which
 * email + WhatsApp sequence starts (see docs/FUNNEL.md → Automation map).
 */
export async function sendToCrm(event: CrmEvent, payload: Record<string, unknown>) {
  const url = process.env.CRM_WEBHOOK_URL;
  const body = JSON.stringify({ event, at: new Date().toISOString(), ...payload });
  if (!url) {
    console.info("[crm:dry-run]", body);
    return { ok: true, dryRun: true };
  }
  const sig = process.env.CRM_WEBHOOK_SECRET
    ? crypto.createHmac("sha256", process.env.CRM_WEBHOOK_SECRET).update(body).digest("hex")
    : "";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-gce-signature": sig },
      body,
    });
    return { ok: res.ok };
  } catch (e) {
    console.error("[crm] delivery failed", e);
    return { ok: false };
  }
}

/** Meta Conversions API — deduplicated with the browser Pixel via event_id. */
export async function sendCapi(opts: {
  eventName: "Lead" | "CompleteRegistration" | "InitiateCheckout" | "Purchase" | "Contact";
  eventId: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  sourceUrl?: string;
  ip?: string | null;
  ua?: string | null;
  consent: boolean;
}) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixel || !token || !opts.consent) return;
  const user_data: Record<string, unknown> = {};
  if (opts.email) user_data.em = [sha256(opts.email)];
  if (opts.phone) user_data.ph = [sha256(opts.phone.replace(/\D/g, ""))];
  if (opts.ip) user_data.client_ip_address = opts.ip;
  if (opts.ua) user_data.client_user_agent = opts.ua;
  const body: Record<string, unknown> = {
    data: [
      {
        event_name: opts.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        action_source: "website",
        event_source_url: opts.sourceUrl,
        user_data,
        custom_data: opts.value != null ? { value: opts.value, currency: opts.currency || "PKR" } : undefined,
      },
    ],
  };
  if (process.env.META_CAPI_TEST_EVENT_CODE) body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("[capi] failed", e);
  }
}

export function reqMeta(req: Request) {
  return {
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    ua: req.headers.get("user-agent"),
    url: req.headers.get("referer") || undefined,
  };
}

/* -------------------- Orders & payment verification -------------------- */

/** Signed, tamper-proof order reference (no DB needed for the stub; swap for a real orders table). */
export function signOrder(payload: Record<string, unknown>) {
  const secret = process.env.PAYMENT_SECRET_KEY || "dev-only-secret";
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${mac}`;
}

export function readOrder<T = Record<string, unknown>>(token: string | undefined | null): T | null {
  if (!token || !token.includes(".")) return null;
  const [data, mac] = token.split(".");
  const secret = process.env.PAYMENT_SECRET_KEY || "dev-only-secret";
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (mac.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString()) as T;
  } catch {
    return null;
  }
}

/**
 * Verify a payment with the gateway. Replace with the approved gateway's
 * server-to-server status API. Returns false until a gateway is configured,
 * so nobody is marked "Enrolled" by simply opening a success URL.
 */
export async function verifyPayment(orderId: string): Promise<{ verified: boolean; amount?: number }> {
  if (!process.env.PAYMENT_SECRET_KEY || process.env.PAYMENT_GATEWAY === "manual") {
    return { verified: false };
  }
  // TODO: call gateway status endpoint with orderId and compare amount/currency.
  void orderId;
  return { verified: false };
}
