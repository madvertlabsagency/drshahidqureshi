import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { YouTube } from "@/components/ui/YouTube";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "You're registered", robots: { index: false } };

export default function Confirmed() {
  const m = site.masterclass;
  const cal = m.date
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("GCE Free Masterclass — Dr. Shahid Qureshi")}&details=${encodeURIComponent("Joining link will be sent by email & WhatsApp.")}`
    : null;
  return (
    <Shell eyebrow="Registration confirmed" title="You're Registered!" lead="Check your email and WhatsApp for joining details. Meanwhile, here's a personal welcome.">
      <div className="card narrow center">
        <div className="success-ring"><Icon name="check" /></div>
        <YouTube id={site.videos.vsl.youtubeId} title="Welcome message from Dr. Shahid" />
        <div className="cta-row center" style={{ marginTop: 24 }}>
          {cal && <Button href={cal} external arrow={false}>Add to Calendar</Button>}
          <Button href="/#pricing" variant="ghost">Already sure? See enrollment options</Button>
        </div>
      </div>
    </Shell>
  );
}
