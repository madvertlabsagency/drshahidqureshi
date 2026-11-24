import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { Button } from "@/components/ui/Button";
import { YouTube } from "@/components/ui/YouTube";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Masterclass replay", robots: { index: false } };

export default function Replay() {
  return (
    <Shell eyebrow="Masterclass replay" title="How to Start Thinking Like an Entrepreneur" lead="Watch the full session, then explore whether GCE Batch 10 is the right next step for you.">
      <div className="card narrow">
        <YouTube id={site.masterclass.replayYoutubeId} title="GCE masterclass replay" />
        <div className="grid-2" style={{ marginTop: 28 }}>
          {site.videos.podcasts.map((v) => (
            <div key={v.youtubeId}><YouTube id={v.youtubeId} title={v.title} /><p className="vt-cap"><b>{v.title}</b></p></div>
          ))}
        </div>
        <div className="cta-row center" style={{ marginTop: 32 }}>
          <Button href="/#pricing" size="lg" trackId="replay_enroll">Explore GCE Batch 10 Pathways</Button>
          <Button href="/consultation" variant="ghost">Speak With Our Team</Button>
        </div>
      </div>
    </Shell>
  );
}
