import type { Metadata } from "next";
import { LeadForm } from "@/components/ui/LeadForm";
import { Shell, SideSummary } from "@/components/ui/Shell";
import { Icon } from "@/components/ui/Icon";
import { site, type PathwayId } from "@/content/site";

export const metadata: Metadata = { title: "Enroll", robots: { index: false } };

export default async function Enroll({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const pre = (["discover", "develop", "transform", "guidance"].includes(sp.pathway || "") ? sp.pathway : "develop") as PathwayId | "guidance";
  return (
    <Shell steps={{ labels: ["Your information", "Payment", "Welcome"], active: 0 }} eyebrow="GCE Batch 10 · Enrollment" title="Begin Your GCE Journey" lead="Complete your details to continue enrollment in your selected pathway. It takes less than a minute.">
      <div className="form-shell">
        <div className="card">
          <LeadForm kind="enroll" submitLabel="Continue to Payment" defaultPathway={pre} />
        </div>
        <SideSummary>
          <span className="eyebrow">What happens next</span>
          <div className="next-steps" style={{ margin: "8px 0 0" }}>
            <div><b>1</b><p>Review your order and choose card or bank transfer.</p></div>
            <div><b>2</b><p>Once payment is verified, you receive your onboarding pack by email &amp; WhatsApp.</p></div>
            <div><b>3</b><p>Join the GCEian community and your first live Saturday session{site.enrollment.commencementDate ? ` on ${site.enrollment.commencementDate}` : ""}.</p></div>
          </div>
          <div className="trust-mini">
            <div><Icon name="award" /> USASBE-recognised programs, 2017 &amp; 2021</div>
            <div><Icon name="globe" /> {site.stats.participants.toLocaleString()}+ participants · {site.stats.countries} countries</div>
            <div><Icon name="lock" /> Your details are encrypted and never sold</div>
          </div>
        </SideSummary>
      </div>
    </Shell>
  );
}
