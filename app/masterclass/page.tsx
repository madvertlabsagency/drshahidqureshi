import type { Metadata } from "next";
import { Shell, SideSummary } from "@/components/ui/Shell";
import { LeadForm } from "@/components/ui/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { Val } from "@/components/ui/Ph";
import { YouTube } from "@/components/ui/YouTube";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Free Masterclass",
  description: "Join Dr. Shahid Qureshi for a free masterclass: how to start thinking like an entrepreneur — even when resources are limited.",
};

export default function Masterclass() {
  const m = site.masterclass;
  return (
    <Shell eyebrow="Free masterclass with Dr. Shahid Qureshi" title={m.title} lead="Discover how entrepreneurial opportunities can begin with the knowledge, relationships and resources you already have.">
      <div className="form-shell">
        <div className="card">
          <YouTube id={site.videos.vsl.youtubeId} title="A personal invitation from Dr. Shahid" />
          <h2 style={{ fontSize: "1.5rem", marginTop: 28 }}>In this free session you&apos;ll discover</h2>
          <ul className="outcomes">
            <li><Icon name="check" />Why entrepreneurial thinking is about far more than having a business idea.</li>
            <li><Icon name="check" />How your existing skills, knowledge and relationships can open new opportunities.</li>
            <li><Icon name="check" />An introduction to Effectuation and purpose-driven (E+) entrepreneurship.</li>
          </ul>
          <h3>Your host</h3>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Dr. Shahid Qureshi — PhD Entrepreneurship (TU Berlin), Babson Fellow, designer of USASBE award-winning entrepreneurship programs (2017 &amp; 2021), trained {site.stats.trained.toLocaleString()}+ entrepreneurs and managers worldwide.
          </p>
        </div>
        <SideSummary>
          <span className="eyebrow">Reserve your free seat</span>
          <p style={{ marginBottom: 18 }}>
            <Icon name="calendar" size={16} /> <Val v={m.date} ph="Confirmed date" /> · <Val v={m.time} ph="time & time zone" /> · {m.format}
          </p>
          <div className="card" style={{ padding: 24, boxShadow: "none", color: "var(--charcoal)" }}>
            <LeadForm kind="masterclass" submitLabel="Reserve My Free Seat" />
          </div>
        </SideSummary>
      </div>
    </Shell>
  );
}
