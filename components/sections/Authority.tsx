import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { banners, caseStudies, clientLogos, endorsements, gceCreatives, mediaAppearances, studentVoices } from "@/content/endorsements";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { ReviewMarquee, type ReviewItem } from "@/components/ui/ReviewMarquee";
import { Button } from "@/components/ui/Button";
import { BannerGallery } from "./Visual";
import { BrandIcon, type BrandIconName } from "@/components/ui/BrandIcon";

const asReview = (e: (typeof endorsements)[number]): ReviewItem => ({ kind: "review", ...e });

/* Trust row above the hero headline */
export function HeroTrust() {
  const faces = endorsements.slice(0, 7);
  return (
    <div className="hero-trust">
      <div className="ht-faces">
        {faces.map((e) => (
          <Image key={e.name} src={e.photo} alt={e.name} title={e.name} width={46} height={46} priority />
        ))}
        <span className="ht-plus">+</span>
      </div>
      <div className="ht-text">
        <span className="ht-stars" aria-hidden="true">★★★★★</span>
        <b>{site.stats.trained.toLocaleString()}+ entrepreneurs &amp; managers trained by Dr. Shahid Qureshi</b>
      </div>
    </div>
  );
}

/* Review section 1: thought leaders */
export function Endorsements() {
  const top = endorsements.slice(0, 7).map(asReview);
  const rest = endorsements.slice(7).map(asReview);
  return (
    <section className="endorse-sec grad-emerald on-dark" id="endorsements">
      <div className="watermark" aria-hidden="true"><LogoMark className="wm-mark" /></div>
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Endorsements from thought leaders</span>
          <h2>
            When Professors From TU Berlin, LUMS, Durham &amp; Ottawa <span className="gold-text">Speak About Your Teacher</span>
          </h2>
          <p className="lead">You don&apos;t have to take our word for it. These are the people who taught, researched and built institutions alongside Dr. Shahid, in their own words.</p>
        </Reveal>
        <Reveal className="leader-faces">
          {endorsements.slice(0, 6).map((e) => (
            <figure key={e.name}>
              <Image src={e.photo} alt={e.name} width={120} height={120} />
              <figcaption><b>{e.name}</b><small>{e.org || e.title}</small></figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
      <ReviewMarquee rows={[top, rest]} dark />
      <p className="center src-note">Source: drshahidqureshi.com/testimonials, reproduced word for word. Hover to pause.</p>
    </section>
  );
}

/* Review section 2: students, colleagues & videos */
export function StoriesMarquee() {
  const text: ReviewItem[] = [...studentVoices.map(asReview), ...endorsements.slice(10).map(asReview)];
  const videos: ReviewItem[] = [
    ...site.videos.podcasts.map((v) => ({ kind: "video" as const, youtubeId: v.youtubeId, poster: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`, title: v.title, sub: v.label })),
    ...site.videos.testimonials.map((v) => ({ kind: "video" as const, youtubeId: v.youtubeId, poster: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`, title: v.title, sub: v.role })),
    ...mediaAppearances.map((m) => ({ kind: "video" as const, poster: m.src, title: m.title, sub: "Interviews & media", href: "https://drshahidqureshi.com/interviews-media/" })),
  ];
  return <ReviewMarquee rows={[text, videos]} speed={80} />;
}

/* Organisation logos: large, scrolling left */
export function LogoStrip() {
  const all = [...clientLogos, ...clientLogos, ...clientLogos];
  return (
    <section className="logo-strip" aria-label="Organisations Dr. Shahid has worked with">
      <p>Programs &amp; trainings delivered for teams at</p>
      <div className="logo-marquee">
        <div className="logo-track">
          {all.map((l, i) => (
            <span key={i} className="logo-tile"><Image src={l.src} alt={i < clientLogos.length ? l.name : ""} width={150} height={150} /></span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* The model went international: banners (any extra file dropped in /public/img/banners appears automatically) */
export function Journey() {
  const dir = path.join(process.cwd(), "public/img/banners");
  const known = new Set(banners.map((b) => b.src));
  const extra = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort().map((f) => `/img/banners/${f}`).filter((s) => !known.has(s)).map((src) => ({ src, alt: "Dr. Shahid Qureshi milestone" }))
    : [];
  return (
    <section className="sec-ivory journey" id="journey">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Why the world came to Pakistan</span>
          <h2>
            A Model So Different, <span className="emerald-text">Professors Flew In to Study It.</span>
          </h2>
          <p className="lead">The Entrepreneurship Plus model was born in Pakistan. It was then taught in Pakistan, the UAE, Germany and Thailand, and studied by Babson College faculty. GCE brings that same model to you.</p>
        </Reveal>
        <BannerGallery banners={[...banners, ...extra]} />
      </div>
    </section>
  );
}

/* Case studies */
export function CaseStudies() {
  return (
    <div className="cases">
      <div className="cases-intro">
        <Image src="/img/sir/mic-crop.webp" alt="Dr. Shahid Qureshi teaching" width={420} height={560} />
        <div>
          <span className="eyebrow">Case studies</span>
          <h3>What Actually Happened When People Applied This Thinking</h3>
          <p>Real outcomes from Dr. Shahid&apos;s programmes, each one documented by the people and institutions involved.</p>
        </div>
      </div>
      <div className="case-grid">
        {caseStudies.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.08} className="case-card">
            <div className="cc-top">
              <BrandIcon name={c.icon as BrandIconName} size={62} tone="emerald" />
              <div><h4>{c.title}</h4><small>{c.who}</small></div>
            </div>
            <ol className="cc-steps">
              <li><b>Before</b>{c.before}</li>
              <li><b>What changed</b>{c.did}</li>
              <li><b>Outcome</b>{c.after}</li>
            </ol>
            <span className="cc-src">Source: {c.source}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* Media appearances gallery */
export function MediaWall() {
  return (
    <div className="media-wall">
      {mediaAppearances.map((m, i) => (
        <Reveal key={m.src} delay={(i % 3) * 0.06} as="figure" className="media-item">
          <a href="https://drshahidqureshi.com/interviews-media/" target="_blank" rel="noopener" aria-label={m.title}>
            <Image src={m.src} alt={m.title} width={800} height={450} sizes="(max-width:700px) 100vw, 380px" />
            <figcaption>{m.title}</figcaption>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

/* GCE creatives carousel */
export function CreativeStrip() {
  const all = [...gceCreatives, ...gceCreatives];
  return (
    <div className="creative-strip" aria-label="Inside the GCE learning experience">
      <div className="creative-track">
        {all.map((c, i) => (
          <Image key={i} src={c.src} alt={i < gceCreatives.length ? c.alt : ""} width={420} height={420} sizes="300px" />
        ))}
      </div>
    </div>
  );
}

/* Pricing visual: abroad route vs GCE route with 3D icons */
export function CostVisual() {
  const abroad = [["building", "Tuition at a top business school"], ["plane", "Flights & accommodation"], ["passport", "Visa & paperwork"], ["alarm", "Weeks away from work & family"]];
  const gce = [["home", "Learn from home, every Saturday"], ["laptop", "Live online with Dr. Shahid"], ["handshake", "Global peer network"], ["grad", "GCE certificate"]];
  return (
    <div className="cost-visual">
      <Reveal className="cv-col cv-abroad">
        <span className="cv-tag">The usual route</span>
        <div className="cv-total"><BrandIcon name="money" size={62} tone="muted" /><b>Tens of thousands of dollars</b></div>
        <ul>{abroad.map(([i, t]) => <li key={t}><BrandIcon name={i as BrandIconName} size={44} tone="muted" />{t}</li>)}</ul>
      </Reveal>
      <div className="cv-vs"><span>VS</span></div>
      <Reveal delay={0.15} className="cv-col cv-gce">
        <span className="cv-tag">The GCE route</span>
        <div className="cv-total"><BrandIcon name="sparkle" size={62} tone="gold" /><b>From PKR 70,000 for the Develop pathway</b></div>
        <ul>{gce.map(([i, t]) => <li key={t}><BrandIcon name={i as BrandIconName} size={44} tone="gold" />{t}</li>)}</ul>
        <Button href="/enroll?pathway=develop" trackId="cost_visual_enroll">Apply for Batch 10</Button>
      </Reveal>
      <Reveal delay={0.25} className="cv-quote">
        <Image src={studentVoices[0].photo} alt={studentVoices[0].name} width={64} height={64} />
        <p>&ldquo;His teachings in 2013 profoundly transformed my entrepreneurial mindset and redirected my professional journey.&rdquo;</p>
        <small>{studentVoices[0].name}, former IBA MBA student, now a serial entrepreneur</small>
      </Reveal>
    </div>
  );
}
