import type { Metadata } from "next";
import { Legal } from "@/components/ui/Legal";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <Legal
      title="Program Terms & Conditions"
      sections={[
        ["The program", <p key="a">The Global Certificate in Entrepreneurship (GCE) is a certificate based, live online learning program. It is not an accredited academic degree.</p>],
        ["Enrollment & fees", <p key="b">Enrollment is confirmed only once payment has been verified. Fees and applicable taxes are shown at checkout. [Approved fee, tax and installment terms]</p>],
        ["Participation & certificate", <p key="c">Certificates are awarded on completing the requirements of the selected pathway. [Attendance / assignment requirements]</p>],
        ["No guarantee of outcomes", <p key="d">GCE provides education, frameworks and community. Business, career or income outcomes depend on individual effort and circumstances and are not guaranteed.</p>],
        ["Intellectual property", <p key="e">Course materials are for personal use by enrolled participants and may not be redistributed.</p>],
      ]}
    />
  );
}
