import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendCapi, sendToCrm } from "@/lib/server";

/**
 * Payment gateway webhook — the ONLY place a purchase becomes "Enrolled".
 * 1. Verify the gateway signature.  2. Mark the order paid in CRM.  3. Fire Meta CAPI Purchase.
 * Adapt the header name / payload shape to the approved gateway.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 503 });

  const sig = req.headers.get("x-signature") || "";
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const evt = JSON.parse(raw) as { status: string; orderId: string; amount: number; currency: string; email?: string; phone?: string };
  if (evt.status !== "paid") return NextResponse.json({ ok: true, ignored: true });

  await sendToCrm("payment.verified", { orderId: evt.orderId, amount: evt.amount, currency: evt.currency, stage: "Paid / Enrolled" });
  await sendCapi({ eventName: "Purchase", eventId: `purchase_${evt.orderId}`, email: evt.email, phone: evt.phone, value: evt.amount, currency: evt.currency, consent: true });
  return NextResponse.json({ ok: true });
}
