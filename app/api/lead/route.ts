import { NextResponse } from "next/server";
import { professionalBackgrounds, site, type PathwayId } from "@/content/site";
import { reqMeta, sendCapi, sendToCrm, signOrder, str, validateContact } from "@/lib/server";

/** Enrollment form (step 1). Validates server-side, creates the CRM lead and a signed order. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (str(body.company)) return NextResponse.json({ ok: true, next: "/" }); // honeypot

  const { data, errors } = validateContact(body);
  const pathway = str(body.pathway, 20) as PathwayId | "guidance";
  const background = str(body.background, 60);
  const timing = str(body.timing, 30);
  const acceptTerms = body.acceptTerms === true;
  const marketingConsent = body.marketingConsent === true;

  if (!["discover", "develop", "transform", "guidance"].includes(pathway)) errors.pathway = "Please choose a pathway.";
  if (!professionalBackgrounds.includes(background)) errors.background = "Please select your background.";
  if (!["morning", "evening", "either"].includes(timing)) errors.timing = "Please select a timing.";
  if (!acceptTerms) errors.acceptTerms = "Please accept the enrollment terms and privacy policy.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const attribution = typeof body.attribution === "object" && body.attribution ? (body.attribution as Record<string, string>) : {};
  const eventId = str(body.eventId, 60) || `lead_${Date.now()}`;
  const meta = reqMeta(req);
  const lead = { ...data, pathway, background, timing, marketingConsent, attribution };

  await sendToCrm("enrollment.form_submitted", { lead, stage: pathway === "guidance" ? "Consultation Requested" : "Payment Pending" });
  await sendCapi({ eventName: "Lead", eventId, email: data.email, phone: data.whatsapp, ip: meta.ip, ua: meta.ua, sourceUrl: meta.url, consent: body.analyticsConsent === true });

  if (pathway === "guidance") {
    await sendToCrm("consultation.requested", { lead });
    return NextResponse.json({ ok: true, next: "/consultation?sent=1" });
  }

  const p = site.pathways.find((x) => x.id === pathway)!;
  const order = signOrder({
    id: `GCE10-${Date.now().toString(36).toUpperCase()}`,
    pathway: p.id,
    name: data.fullName,
    email: data.email,
    whatsapp: data.whatsapp,
    country: data.country,
    ts: Date.now(),
  });
  return NextResponse.json({ ok: true, next: `/checkout?order=${encodeURIComponent(order)}` });
}
