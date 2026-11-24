import type { Metadata } from "next";
import { Legal } from "@/components/ui/Legal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <Legal
      title="Privacy Policy"
      sections={[
        ["Information we collect", <p key="a">Name, email, WhatsApp number, country, professional background, selected pathway and batch preference that you submit, plus campaign source (UTM) data and, with your consent, analytics and advertising cookies.</p>],
        ["How we use it", <ul key="b"><li>To process your enrollment and payment.</li><li>To send onboarding, reminders and program communication.</li><li>With your consent, to send educational resources and course updates by email and WhatsApp.</li><li>To measure and improve our marketing (Google Analytics, Meta Pixel / Conversions API), only after consent.</li></ul>],
        ["Sharing", <p key="c">We share data only with service providers that help us run the program (CRM, email/WhatsApp messaging, payment gateway, analytics). We never sell your data.</p>],
        ["Your choices", <p key="d">You can unsubscribe from marketing at any time, withdraw cookie consent, or request access to or deletion of your data by contacting us.</p>],
        ["Contact", <p key="e">[Official contact email and address]</p>],
      ]}
    />
  );
}
