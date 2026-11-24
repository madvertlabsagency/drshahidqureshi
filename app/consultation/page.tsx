import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { LeadForm } from "@/components/ui/LeadForm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Enrollment consultation" };

export default async function Consultation({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  if (sp.sent)
    return (
      <Shell title="Thank You — We'll Be in Touch" lead="A member of our enrollment team will contact you on WhatsApp shortly.">
        <div className="card narrow center">
          <div className="success-ring"><Icon name="check" /></div>
          <Button href="/" variant="ghost">Back to the Program</Button>
        </div>
      </Shell>
    );
  return (
    <Shell eyebrow="Personal enrollment guidance" title="Speak With Our Enrollment Team" lead="Not sure which pathway fits your goals, schedule or situation? Tell us a little about you and we'll call you back.">
      <div className="card narrow">
        <LeadForm kind="consultation" submitLabel="Request a Call Back" />
      </div>
    </Shell>
  );
}
