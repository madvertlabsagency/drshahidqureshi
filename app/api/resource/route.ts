import { NextResponse } from "next/server";
import { sendToCrm, str, validateContact } from "@/lib/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (str(body.company)) return NextResponse.json({ ok: true, next: "/resources?sent=1" });
  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  const resource = str(body.resource, 60);
  await sendToCrm("resource.downloaded", { lead: { ...data, marketingConsent: body.marketingConsent === true, attribution: body.attribution }, resource, stage: "New Inquiry" });
  return NextResponse.json({ ok: true, next: `/resources?sent=1&r=${encodeURIComponent(resource)}` });
}
