import type { Metadata } from "next";
import Link from "next/link";
import { Shell, SideSummary } from "@/components/ui/Shell";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/ui/Ph";
import { GST_RATE, formatPKR, site } from "@/content/site";
import { readOrder } from "@/lib/server";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

type Order = { id: string; pathway: string; name: string; email: string };

export default async function Checkout({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const order = readOrder<Order>(sp.order);
  const p = order && site.pathways.find((x) => x.id === order.pathway);
  if (!order || !p)
    return (
      <Shell title="Let's restart your enrollment" lead="Your checkout session was not found or has expired.">
        <div className="card center"><Link href="/enroll" className="btn btn-primary">Restart Enrollment <Icon name="arrow" /></Link></div>
      </Shell>
    );
  const tax = p.feePKR != null ? Math.round(p.feePKR * GST_RATE) : null;
  const total = p.feePKR != null ? p.feePKR + (tax || 0) : null;
  return (
    <Shell steps={{ labels: ["Your information", "Payment", "Welcome"], active: 1 }} eyebrow="Secure checkout" title="Complete Your Enrollment" lead={`Assalam o Alaikum, ${order.name.split(" ")[0]}. One step left.`}>
      <div className="form-shell">
        <div className="card">
          <CheckoutForm order={sp.order!} value={total} pathway={p.id} />
          {p.feePKR == null && <p className="cta-note">This pathway&apos;s fee is being finalised — our team will contact you on WhatsApp.</p>}
          <p className="cta-note">Order reference: <b>{order.id}</b>. Your enrollment is confirmed only after the payment is verified.</p>
        </div>
        <SideSummary>
          <span className="eyebrow">Your order summary</span>
          <h3 style={{ color: "var(--ivory)" }}>GCE Batch 10 — {p.name}</h3>
          <p style={{ marginBottom: 16 }}>{p.weeks}-week learning pathway</p>
          <div className="sum-line"><span>Program fee</span><span>{p.feePKR != null ? formatPKR(p.feePKR) : <Ph>fee</Ph>}</span></div>
          <div className="sum-line"><span>Applicable GST</span><span>{GST_RATE ? formatPKR(tax || 0) : <Ph>GST rate</Ph>}</span></div>
          <div className="sum-line total"><span>Total payable</span><span>{total != null ? formatPKR(total) : "—"}</span></div>
          <div className="trust-mini">
            <div><Icon name="lock" /> Payments processed by an approved, encrypted gateway</div>
            <div><Icon name="shield" /> Transparent terms · <Link href="/refund-policy" style={{ color: "var(--gold)" }}>refund policy</Link></div>
          </div>
        </SideSummary>
      </div>
    </Shell>
  );
}
