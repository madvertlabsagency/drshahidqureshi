import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { Button, whatsappHref } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { YouTube } from "@/components/ui/YouTube";
import { readOrder, verifyPayment } from "@/lib/server";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Welcome to GCE", robots: { index: false } };

/** Paid student onboarding. Shows the welcome ONLY after server-side payment verification. */
export default async function Welcome({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const order = readOrder<{ id: string; name: string }>(sp.order);
  const v = order ? await verifyPayment(order.id) : { verified: false };

  if (!order || !v.verified)
    return (
      <Shell title="We're Verifying Your Payment" lead="This usually takes a few minutes. You'll receive a confirmation on email and WhatsApp as soon as it's verified.">
        <div className="card narrow center">
          <p>Order: <b>{order?.id || ", "}</b></p>
          <div className="cta-row center" style={{ marginTop: 20 }}>
            <Button href={whatsappHref(site.contact.whatsapp, `Assalam o Alaikum, please confirm payment for order ${order?.id || ""}.`)} external arrow={false}>Contact Enrollment Team</Button>
          </div>
        </div>
      </Shell>
    );

  return (
    <Shell steps={{ labels: ["Your information", "Payment", "Welcome"], active: 2 }} eyebrow="Payment verified" title={<>Welcome to GCE, {order.name.split(" ")[0]}!</>} lead="Your entrepreneurial learning journey begins here.">
      <div className="card narrow center">
        <div className="success-ring"><Icon name="check" /></div>
        <YouTube id={site.videos.vsl.youtubeId} title="A personal welcome from Dr. Shahid" />
        <div className="next-steps" style={{ color: "var(--charcoal)" }}>
          {["Check your email for your receipt and onboarding pack.", "Join the GCEian WhatsApp community (link in your email).", "Add the first live Saturday session to your calendar."].map((s, i) => (
            <div key={s} style={{ background: "var(--ivory)", borderColor: "var(--line)" }}><b style={{ color: "var(--emerald)" }}>{i + 1}</b><p style={{ color: "var(--charcoal)" }}>{s}</p></div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
