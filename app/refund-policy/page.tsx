import type { Metadata } from "next";
import { Legal } from "@/components/ui/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Refund & Cancellation Policy" };

export default function Page() {
  const t = site.offerTerms;
  return (
    <Legal
      title="Refund & Cancellation Policy"
      sections={[
        ["First-session promise", <p key="a">{t.firstSessionPromise ? `If you feel GCE isn't right for you after the first live session and tell us before the second session, you'll receive ${t.firstSessionPromise}.` : "[Approved first-session policy]"}</p>],
        ["Cohort transfer", <p key="b">{t.cancellation || "[Approved transfer / cancellation conditions]"}</p>],
        ["How to request", <p key="c">Contact the enrollment team on WhatsApp or email with your order reference. [Processing time]</p>],
      ]}
    />
  );
}
