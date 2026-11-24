"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Endorsement } from "@/content/endorsements";
import { YouTube } from "./YouTube";

export type VideoCard = { kind: "video"; youtubeId?: string; poster: string; title: string; sub: string; href?: string };
export type ReviewItem = ({ kind: "review" } & Endorsement) | VideoCard;

function excerpt(q: string, n = 210) {
  if (q.length <= n) return q;
  return q.slice(0, q.lastIndexOf(" ", n)) + "…";
}

/**
 * Two rows of reviews moving in opposite directions at a readable pace.
 * Hover / touch pauses; "Read full" opens the complete, verbatim quote.
 */
export function ReviewMarquee({ rows, dark, speed = 70 }: { rows: [ReviewItem[], ReviewItem[]]; dark?: boolean; speed?: number }) {
  const [open, setOpen] = useState<ReviewItem | null>(null);

  const card = (r: ReviewItem, k: number) =>
    r.kind === "review" ? (
      <figure key={k} className={`rv${dark ? " rv-dark" : ""}`}>
        <div className="rv-head">
          <Image src={r.photo} alt={r.name} width={64} height={64} className="rv-photo" />
          <span>
            <b>{r.name}</b>
            <small>{r.title}{r.org ? ` · ${r.org}` : ""}</small>
          </span>
        </div>
        <div className="rv-stars" aria-hidden="true">★★★★★</div>
        <blockquote>&ldquo;{excerpt(r.quote)}&rdquo;</blockquote>
        {r.quote.length > 210 && (
          <button className="rv-more" onClick={() => setOpen(r)}>Read full endorsement</button>
        )}
      </figure>
    ) : (
      <figure key={k} className="rv rv-video">
        <button className="rv-vbtn" onClick={() => (r.youtubeId ? setOpen(r) : r.href && window.open(r.href, "_blank", "noopener"))} aria-label={`Watch: ${r.title}`}>
          <Image src={r.poster} alt="" width={640} height={360} sizes="380px" unoptimized={r.poster.startsWith("http")} />
          <span className="play play-sm"><svg viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg></span>
        </button>
        <figcaption><b>{r.title}</b><small>{r.sub}</small></figcaption>
      </figure>
    );

  return (
    <>
      <div className="rv-marquee">
        {rows.map((row, ri) => (
          <div key={ri} className={`rv-row ${ri === 0 ? "to-left" : "to-right"}`} style={{ ["--dur" as string]: `${Math.max(row.length, 4) * (speed / 6)}s` }}>
            <div className="rv-track">
              {row.map((r, k) => card(r, k))}
              {row.map((r, k) => card(r, k + 1000))}
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="pop-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <motion.div className="pop pop-quote" initial={{ y: 30 }} animate={{ y: 0 }} role="dialog" aria-modal="true">
              <button className="pop-x" onClick={() => setOpen(null)} aria-label="Close">×</button>
              {open.kind === "review" ? (
                <>
                  <div className="rv-head big">
                    <Image src={open.photo} alt={open.name} width={88} height={88} className="rv-photo" />
                    <span><b>{open.name}</b><small>{open.title}{open.org ? ` · ${open.org}` : ""}</small></span>
                  </div>
                  <blockquote className="pq-full">&ldquo;{open.quote}&rdquo;</blockquote>
                </>
              ) : (
                open.youtubeId && <YouTube id={open.youtubeId} title={open.title} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
