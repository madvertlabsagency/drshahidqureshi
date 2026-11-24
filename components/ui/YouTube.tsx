"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { track } from "@/lib/tracking";

/**
 * Lightweight, privacy-friendly YouTube embed: shows a poster until clicked, then loads
 * youtube-nocookie. Tracks play + 25/50/75/100% progress via the IFrame API postMessage feed.
 */
export function YouTube({
  id,
  title,
  label,
  poster,
  variant = "plain",
  eyebrow,
  headline,
}: {
  id: string;
  title: string;
  label?: string;
  poster?: string;
  variant?: "plain" | "vsl";
  eyebrow?: string;
  headline?: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const marks = useRef(new Set<number>());

  function start() {
    setPlaying(true);
    track("video_start", { video_id: id, video_title: title });
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string" || !e.origin.includes("youtube")) return;
      try {
        const d = JSON.parse(e.data);
        const info = d?.info;
        if (info?.currentTime && info?.duration) {
          const pct = (info.currentTime / info.duration) * 100;
          [25, 50, 75, 95].forEach((m) => {
            if (pct >= m && !marks.current.has(m)) {
              marks.current.add(m);
              track("video_progress", { video_id: id, video_title: title, percent: m });
            }
          });
        }
      } catch {}
    };
    window.addEventListener("message", onMsg);
  }

  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`;

  return (
    <div className={variant === "vsl" ? "vsl" : "yt"}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="yt-frame"
          onLoad={(e) => {
            // subscribe to progress events
            e.currentTarget.contentWindow?.postMessage(JSON.stringify({ event: "listening", id }), "*");
          }}
        />
      ) : (
        <button type="button" className="yt-poster" onClick={start} aria-label={`Play video: ${title}`}>
          {variant === "vsl" ? (
            <span className="vsl-inner">
              <span className="vsl-copy">
                {eyebrow && <small>{eyebrow}</small>}
                <strong>{headline}</strong>
              </span>
              <span className="vsl-photo" style={{ backgroundImage: `url(${poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`})` }} />
            </span>
          ) : (
            <Image src={poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill unoptimized={!poster} sizes="(max-width: 768px) 100vw, 600px" style={{ objectFit: "cover" }} />
          )}
          <span className={variant === "vsl" ? "play" : "play play-sm"}>
            <Icon name="play" />
          </span>
          {label && <span className="vsl-label">{label}</span>}
        </button>
      )}
    </div>
  );
}
