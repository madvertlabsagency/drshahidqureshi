import { NextResponse } from "next/server";
import { reqMeta, sendCapi, sendToCrm, str, validateContact } from "@/lib/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (str(body.company)) return NextResponse.json({ ok: true, next: "/consultation?sent=1" });
  const { data, errors } = validateContact(body);
  const question = str(body.question, 1000);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  const meta = reqMeta(req);
  await sendToCrm("consultation.requested", { lead: { ...data, question, preferredTime: str(body.preferredTime, 40), attribution: body.attribution }, stage: "Consultation Requested" });
  await sendCapi({ eventName: "Contact", eventId: str(body.eventId, 60) || `ct_${Date.now()}`, email: data.email, phone: data.whatsapp, ip: meta.ip, ua: meta.ua, sourceUrl: meta.url, consent: body.analyticsConsent === true });
  return NextResponse.json({ ok: true, next: "/consultation?sent=1" });
}
