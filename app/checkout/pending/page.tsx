import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { Button, whatsappHref } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Ph";
import { readOrder } from "@/lib/server";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Payment pending", robots: { index: false } };

export default async function Pending({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const order = readOrder<{ id: string; name: string }>(sp.order);
  const bank = sp.method === "bank";
  return (
    <Shell steps={{ labels: ["Your information", "Payment", "Welcome"], active: 1 }} eyebrow="Almost there" title="Your Seat Is Being Reserved" lead="We'll confirm your enrollment as soon as your payment is verified.">
      <div className="card narrow">
        <h3>Order {order?.id || ""}</h3>
        {bank ? (
          <>
            <p style={{ marginTop: 10 }}>Please transfer the total amount to the account below and share the receipt on WhatsApp with your order reference.</p>
            <p style={{ marginTop: 14 }}><Ph>Approved bank name · account title · IBAN · SWIFT for international transfers</Ph></p>
          </>
        ) : (
          <p style={{ marginTop: 10 }}>
            You&apos;ll be redirected to our secure payment gateway. <Ph>Gateway integration pending, set PAYMENT_GATEWAY in .env</Ph>
          </p>
        )}
        <p className="cta-note">If you don&apos;t complete payment, we&apos;ll send a gentle reminder by email and WhatsApp (where you consented).</p>
        <div className="cta-row" style={{ marginTop: 22 }}>
          <Button href={whatsappHref(site.contact.whatsapp, `Assalam o Alaikum, here is my payment receipt for order ${order?.id || ""}.`)} external arrow={false} trackId="pending_whatsapp">Send Receipt on WhatsApp</Button>
          <Button href="/" variant="ghost">Back to Program</Button>
        </div>
      </div>
    </Shell>
  );
}
