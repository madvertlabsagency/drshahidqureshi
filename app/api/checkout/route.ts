import { NextResponse } from "next/server";
import { GST_RATE, site } from "@/content/site";
import { readOrder, reqMeta, sendCapi, sendToCrm, str } from "@/lib/server";

type Order = { id: string; pathway: string; name: string; email: string; whatsapp: string; country: string };

/**
 * Initiates payment. Price is ALWAYS recomputed on the server from content/site.ts —
 * the browser never sends an amount.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const order = readOrder<Order>(str(body.order, 2000));
  if (!order) return NextResponse.json({ ok: false, error: "Your session expired. Please restart enrollment." }, { status: 400 });
  const p = site.pathways.find((x) => x.id === order.pathway);
  if (!p || p.feePKR == null) return NextResponse.json({ ok: false, error: "This pathway's fee is not yet published. Our team will contact you." }, { status: 409 });

  const method = str(body.method, 20);
  if (!["card", "bank"].includes(method)) return NextResponse.json({ ok: false, error: "Choose a payment method." }, { status: 422 });

  const total = Math.round(p.feePKR * (1 + GST_RATE));
  const meta = reqMeta(req);
  await sendToCrm("checkout.started", { orderId: order.id, pathway: p.id, amount: total, currency: "PKR", method, email: order.email, whatsapp: order.whatsapp });
  await sendCapi({ eventName: "InitiateCheckout", eventId: str(body.eventId, 60) || order.id, email: order.email, phone: order.whatsapp, value: total, currency: "PKR", ip: meta.ip, ua: meta.ua, sourceUrl: meta.url, consent: body.analyticsConsent === true });

  const token = encodeURIComponent(str(body.order, 2000));
  if (method === "card" && process.env.PAYMENT_GATEWAY && process.env.PAYMENT_GATEWAY !== "manual") {
    // TODO: create a hosted checkout session with the approved gateway (Safepay / PayFast / Stripe…)
    // using order.id + total, with return_url = /welcome?order=… and webhook = /api/payment/webhook.
    return NextResponse.json({ ok: true, next: `/checkout/pending?order=${token}&method=card` });
  }
  await sendToCrm("payment.pending", { orderId: order.id, method, amount: total });
  return NextResponse.json({ ok: true, next: `/checkout/pending?order=${token}&method=${method}` });
}
