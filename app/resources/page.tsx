import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { LeadForm } from "@/components/ui/LeadForm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/ui/Ph";

export const metadata: Metadata = { title: "Free entrepreneurship resources" };

const resources = [
  { id: "resource-discovery", t: "The Resource Discovery Worksheet", b: "Map your skills, knowledge and network — your real starting capital." },
  { id: "affordable-loss", t: "The Affordable-Loss Calculator", b: "Decide what you can afford to risk before taking your next step." },
  { id: "five-principles", t: "The 5 Principles of Effectuation — Guide", b: "A practical summary of how expert entrepreneurs think." },
];

export default async function Resources({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  if (sp.sent)
    return (
      <Shell title="Your Resource Is on Its Way" lead="Check your email and WhatsApp for the download link.">
        <div className="card narrow center">
          <div className="success-ring"><Icon name="download" /></div>
          <p><Ph>Attach approved PDF in /public/resources and link it in the CRM email</Ph></p>
          <div className="cta-row center" style={{ marginTop: 18 }}>
            <Button href="/masterclass">Join the Free Masterclass</Button>
          </div>
        </div>
      </Shell>
    );
  return (
    <Shell eyebrow="Free resources" title="Start Thinking Like an Entrepreneur — Today" lead="Practical tools from the GCE toolkit. Free, no strings attached.">
      <div className="grid-3">
        {resources.map((r) => (
          <div key={r.id} className="res-card">
            <span className="ico"><Icon name="doc" /></span>
            <h3>{r.t}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>{r.b}</p>
            <details>
              <summary className="btn btn-emerald" style={{ listStyle: "none" }}>Get It Free</summary>
              <div style={{ marginTop: 16 }}><LeadForm kind="resource" resource={r.id} submitLabel="Send Me the Resource" /></div>
            </details>
          </div>
        ))}
      </div>
      <p className="center" style={{ marginTop: 16 }}><Ph>Proposed lead magnets — publish only approved resources</Ph></p>
    </Shell>
  );
}
