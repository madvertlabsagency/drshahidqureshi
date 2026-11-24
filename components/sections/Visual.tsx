"use client";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { BrandIcon, type BrandIconName } from "@/components/ui/BrandIcon";
const I = (n: string) => n as BrandIconName;

/* ------------------------------------------------------------------ */
/* Transformation: playful flip cards with 3D icons                     */
/* ------------------------------------------------------------------ */
const shifts = [
  { from: "Dependence", fi: "link", to: "Independence", ti: "wings" },
  { from: "Hopelessness", fi: "rain", to: "Hope", ti: "sunrise" },
  { from: "Taking", fi: "take", to: "Giving", ti: "gift" },
  { from: "Selfishness", fi: "user", to: "Beyond Self", ti: "handshake" },
  { from: "Fixed Mindset", fi: "wall", to: "Growth Mindset", ti: "sprout" },
  { from: "Finite Mindset", fi: "hourglass", to: "Infinite Mindset", ti: "infinity" },
  { from: "Purposelessness", fi: "fog", to: "Purpose & Meaning", ti: "target" },
  { from: "Blind Following", fi: "follow", to: "Creativity", ti: "bulb" },
  { from: "Plan Only", fi: "clipboard", to: "Act & Adapt", ti: "compass" },
  { from: "Consumer", fi: "cart", to: "Creator", ti: "rocket" },
];

export function TransformFlip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [after, setAfter] = useState(false);
  const [manual, setManual] = useState<Record<number, boolean>>({});
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAfter(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const flipped = (i: number) => (i in manual ? manual[i] : after);

  return (
    <div ref={ref}>
      <div className="flip-toggle" role="group" aria-label="Before and after GCE">
        <button className={!after ? "on" : ""} onClick={() => { setManual({}); setAfter(false); }}>
          <BrandIcon name="rain" size={28} tone="muted" /> Before GCE
        </button>
        <button className={after ? "on" : ""} onClick={() => { setManual({}); setAfter(true); }}>
          <BrandIcon name="sparkle" size={28} tone="emerald" /> After GCE
        </button>
      </div>
      <div className="flip-grid">
        {shifts.map((s, i) => (
          <button
            key={s.from}
            className={`flip${flipped(i) ? " is-flipped" : ""}`}
            style={{ transitionDelay: `${after && !(i in manual) ? i * 110 : 0}ms` }}
            onClick={() => setManual((m) => ({ ...m, [i]: !flipped(i) }))}
            aria-label={`${s.from} becomes ${s.to}`}
          >
            <span className="flip-inner" style={{ transitionDelay: `${after && !(i in manual) ? i * 110 : 0}ms` }}>
              <span className="flip-face front">
                <BrandIcon name={I(s.fi)} size={76} tone="muted" />
                <b>{s.from}</b>
              </span>
              <span className="flip-face back">
                <BrandIcon name={I(s.ti)} size={76} tone="gold" />
                <b>{s.to}</b>
              </span>
            </span>
          </button>
        ))}
      </div>
      <p className="flip-hint">Tap any card to see the shift</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Roadblock artwork                                                    */
/* ------------------------------------------------------------------ */
export function RoadblockArt() {
  return (
    <div className="road-art" aria-hidden="true">
      <div className="road">
        <span className="lane" />
      </div>
      <div className="barrier">
        <BrandIcon name="barrier" size={104} tone="gold" className="cone" />
        <div className="signs">
          <span>Not enough capital</span>
          <span>Not the right time</span>
          <span>No perfect idea yet</span>
        </div>
      </div>
      <BrandIcon name="question" size={80} tone="emerald" className="thinker" />
      <svg className="detour" viewBox="0 0 400 160" preserveAspectRatio="none">
        <path d="M20 140 C 120 140, 140 30, 250 40 S 370 60, 385 20" />
      </svg>
      <div className="whatif">
        <BrandIcon name="bulb" size={46} tone="gold" />
        <span>
          <b>What if…</b>you start with what you already have?
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Principle artworks (3D icon compositions)                            */
/* ------------------------------------------------------------------ */
const arts: Record<string, { a: string; b: string; c?: string; label: string }> = {
  "01": { a: "hand", b: "bird", c: "books", label: "Who you are · What you know · Whom you know" },
  "02": { a: "scale", b: "coin", c: "shield", label: "Risk only what you can afford" },
  "03": { a: "puzzle", b: "handshake", c: "needle", label: "Partners stitch the venture together" },
  "04": { a: "lemon", b: "glass", c: "sparkle", label: "Surprises become opportunities" },
  "05": { a: "plane", b: "wheel", c: "compass", label: "Steer what you can control" },
};

export function PrincipleArt({ n }: { n: string }) {
  const x = arts[n];
  return (
    <div className="p-art" aria-hidden="true">
      <span className="glow" />
      <BrandIcon name={I(x.a)} size={140} tone="gold" className="pa-a" />
      <BrandIcon name={I(x.b)} size={100} tone="emerald" className="pa-b" />
      {x.c && <BrandIcon name={I(x.c)} size={66} tone="glass" className="pa-c" />}
      <span className="pa-label">{x.label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flags gathering from around the world                                */
/* ------------------------------------------------------------------ */
/** Countries participants have come from. Counts = IBA International Entrepreneurship Summer School (IESS) banner. */
const flags: [string, string, number?][] = [
  ["th", "Thailand", 16], ["cn", "China", 4], ["au", "Australia", 3], ["mx", "Mexico", 1], ["zw", "Zimbabwe", 1], ["ru", "Russia", 1],
  ["lu", "Luxembourg", 1], ["ca", "Canada", 1], ["us", "USA", 1], ["na", "Namibia", 1], ["bd", "Bangladesh", 1], ["az", "Azerbaijan", 1],
  ["np", "Nepal", 1], ["gb", "UK"], ["de", "Germany"], ["nl", "Netherlands"], ["pt", "Portugal"], ["sa", "Saudi Arabia"], ["ae", "UAE"],
  ["qa", "Qatar"], ["ke", "Kenya"], ["ng", "Nigeria"], ["gh", "Ghana"], ["so", "Somalia"], ["kz", "Kazakhstan"], ["af", "Afghanistan"],
  ["in", "India"], ["my", "Malaysia"], ["id", "Indonesia"], ["nz", "New Zealand"],
];

export function FlagGather() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="flag-stage">
      <div className="flag-cluster">
        {flags.map(([cc, name, count], i) => {
          const ang = (i / flags.length) * Math.PI * 2;
          const r = 520;
          return (
            <motion.span
              key={cc}
              className="flag"
              title={name}
              initial={reduce ? false : { x: Math.round(Math.cos(ang) * r), y: Math.round(Math.sin(ang) * r * 0.6), opacity: 0, scale: 0.4, rotate: (i % 2 ? 1 : -1) * 90 }}
              animate={inView ? { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: i * 0.05 }}
            >
              <Image src={`/img/flags/${cc}.svg`} alt={name} width={56} height={56} />
              {count ? <em className="flag-count">{count}</em> : null}
              <small>{name}</small>
            </motion.span>
          );
        })}
        <motion.span
          className="flag home"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ delay: flags.length * 0.05 + 0.3, type: "spring" }}
        >
          <Image src="/img/flags/pk.svg" alt="Pakistan" width={96} height={96} />
          <small>They came to learn in Pakistan</small>
        </motion.span>
      </div>
      <p className="iess-note">
        <b>IBA International Entrepreneurship Summer School:</b> 44 from Pakistan, 16 from Thailand, 4 from China, 3 from Australia, and participants from Mexico,
        Zimbabwe, Russia, Luxembourg, Canada, the USA, Namibia, Bangladesh, Azerbaijan and Nepal.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Banner lightbox gallery                                              */
/* ------------------------------------------------------------------ */
export function BannerGallery({ banners }: { banners: { src: string; alt: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="banner-grid">
        {banners.map((b, i) => (
          <motion.button
            key={b.src}
            className={`banner${i === 0 ? " wide" : ""}`}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            aria-label={`Enlarge: ${b.alt}`}
          >
            <Image src={b.src} alt={b.alt} width={1600} height={900} sizes="(max-width:800px) 100vw, 700px" />
            <span className="zoom">Tap to view</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="lb-inner">
              <Image src={banners[open].src} alt={banners[open].alt} width={1600} height={900} sizes="95vw" />
            </motion.div>
            <button className="lb-close" aria-label="Close">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
