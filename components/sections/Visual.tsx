"use client";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const i3 = (n: string) => `/img/3d/${n}.webp`;

/* ------------------------------------------------------------------ */
/* Transformation: playful flip cards with 3D icons                     */
/* ------------------------------------------------------------------ */
const shifts = [
  { from: "Dependence", fi: "chains", to: "Independence", ti: "eagle" },
  { from: "Hopelessness", fi: "sad", to: "Hope", ti: "sunrise" },
  { from: "Taking", fi: "moneybag", to: "Giving", ti: "gift" },
  { from: "Selfishness", fi: "person", to: "Beyond Self", ti: "handshake" },
  { from: "Fixed Mindset", fi: "brick", to: "Growth Mindset", ti: "seedling" },
  { from: "Finite Mindset", fi: "hourglass", to: "Infinite Mindset", ti: "infinity" },
  { from: "Purposelessness", fi: "fog", to: "Purpose & Meaning", ti: "target" },
  { from: "Blind Following", fi: "sheep", to: "Creativity", ti: "bulb" },
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
          <Image src={i3("sad")} alt="" width={26} height={26} /> Before GCE
        </button>
        <button className={after ? "on" : ""} onClick={() => { setManual({}); setAfter(true); }}>
          <Image src={i3("sparkles")} alt="" width={26} height={26} /> After GCE
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
                <Image src={i3(s.fi)} alt="" width={72} height={72} />
                <b>{s.from}</b>
              </span>
              <span className="flip-face back">
                <Image src={i3(s.ti)} alt="" width={72} height={72} />
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
        <Image src={i3("construction")} alt="" width={120} height={120} className="cone" />
        <div className="signs">
          <span>Not enough capital</span>
          <span>Not the right time</span>
          <span>No perfect idea yet</span>
        </div>
      </div>
      <Image src={i3("thinking")} alt="" width={84} height={84} className="thinker" />
      <svg className="detour" viewBox="0 0 400 160" preserveAspectRatio="none">
        <path d="M20 140 C 120 140, 140 30, 250 40 S 370 60, 385 20" />
      </svg>
      <div className="whatif">
        <Image src={i3("bulb")} alt="" width={48} height={48} />
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
  "01": { a: "palms", b: "bird", c: "books", label: "Who you are · What you know · Whom you know" },
  "02": { a: "scale", b: "coin", c: "shield", label: "Risk only what you can afford" },
  "03": { a: "puzzle", b: "handshake", c: "thread", label: "Partners stitch the venture together" },
  "04": { a: "lemon", b: "drink", c: "sparkles", label: "Surprises become opportunities" },
  "05": { a: "plane", b: "steering", c: "compass", label: "Steer what you can control" },
};

export function PrincipleArt({ n }: { n: string }) {
  const x = arts[n];
  return (
    <div className="p-art" aria-hidden="true">
      <span className="glow" />
      <Image src={i3(x.a)} alt="" width={150} height={150} className="pa-a" />
      <Image src={i3(x.b)} alt="" width={110} height={110} className="pa-b" />
      {x.c && <Image src={i3(x.c)} alt="" width={70} height={70} className="pa-c" />}
      <span className="pa-label">{x.label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flags gathering from around the world                                */
/* ------------------------------------------------------------------ */
const flags: [string, string][] = [
  ["us", "USA"], ["ca", "Canada"], ["gb", "UK"], ["de", "Germany"], ["nl", "Netherlands"], ["pt", "Portugal"], ["fr", "France"],
  ["sa", "Saudi Arabia"], ["ae", "UAE"], ["qa", "Qatar"], ["om", "Oman"], ["tr", "Türkiye"], ["eg", "Egypt"], ["ke", "Kenya"],
  ["ng", "Nigeria"], ["gh", "Ghana"], ["so", "Somalia"], ["kz", "Kazakhstan"], ["az", "Azerbaijan"], ["af", "Afghanistan"],
  ["in", "India"], ["bd", "Bangladesh"], ["lk", "Sri Lanka"], ["my", "Malaysia"], ["th", "Thailand"], ["id", "Indonesia"],
  ["au", "Australia"], ["nz", "New Zealand"], ["cu", "Cuba"],
];

export function FlagGather() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="flag-stage">
      <div className="flag-cluster">
        {flags.map(([cc, name], i) => {
          const ang = (i / flags.length) * Math.PI * 2;
          const r = 520;
          return (
            <motion.span
              key={cc}
              className="flag"
              title={name}
              initial={reduce ? false : { x: Math.cos(ang) * r, y: Math.sin(ang) * r * 0.6, opacity: 0, scale: 0.4, rotate: (i % 2 ? 1 : -1) * 90 }}
              animate={inView ? { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: i * 0.05 }}
            >
              <Image src={`/img/flags/${cc}.svg`} alt={name} width={56} height={56} />
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
