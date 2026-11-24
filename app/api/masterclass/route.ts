import { NextResponse } from "next/server";
import { reqMeta, sendCapi, sendToCrm, str, validateContact } from "@/lib/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (str(body.company)) return NextResponse.json({ ok: true, next: "/masterclass/confirmed" });
  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  const meta = reqMeta(req);
  await sendToCrm("masterclass.registered", { lead: { ...data, marketingConsent: body.marketingConsent === true, attribution: body.attribution }, stage: "Masterclass Registered" });
  await sendCapi({ eventName: "CompleteRegistration", eventId: str(body.eventId, 60) || `mc_${Date.now()}`, email: data.email, phone: data.whatsapp, ip: meta.ip, ua: meta.ua, sourceUrl: meta.url, consent: body.analyticsConsent === true });
  return NextResponse.json({ ok: true, next: "/masterclass/confirmed" });
}
