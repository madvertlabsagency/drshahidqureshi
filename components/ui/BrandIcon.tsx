/**
 * Branded 3D icons: emerald glossy tile + gold bevelled glyph, built purely from SVG
 * in the DSQ palette. No emoji anywhere on the site.
 */
const G: Record<string, React.ReactNode> = {
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  broken: <><path d="M9 7 7.5 4.5M15 17l1.5 2.5M4.5 9H7M17 15h2.5" /><path d="M10.5 15.5 8.7 17.3a3.5 3.5 0 0 1-5-5l1.8-1.8M13.5 8.5l1.8-1.8a3.5 3.5 0 0 1 5 5l-1.8 1.8" /></>,
  wings: <><path d="M12 20V10" /><path d="M12 11C9 6 5 5 2 6c2 1 3 3 3 5 2-1 5-1 7 0z" /><path d="M12 11c3-5 7-6 10-5-2 1-3 3-3 5-2-1-5-1-7 0z" /><circle cx="12" cy="8" r="1.6" /></>,
  rain: <><path d="M7 15a4 4 0 0 1-.6-8 5 5 0 0 1 9.6 1.2A3.5 3.5 0 0 1 17 15z" /><path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" /></>,
  sunrise: <><path d="M3 18h18M6 18a6 6 0 0 1 12 0" /><path d="M12 4v3M4.9 8.9 7 11M19.1 8.9 17 11M2 13h2M20 13h2" /></>,
  take: <><path d="M4 13h4l3 2h5a1.5 1.5 0 0 1 0 3h-5" /><path d="M8 13v6H4" /><circle cx="15" cy="7" r="3" /></>,
  gift: <><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M2.5 9h19v-2.5h-19zM12 6.5V20" /><path d="M12 6.5C10 3 6.5 3.5 7.5 6.5M12 6.5c2-3.5 5.5-3 4.5 0" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 4-6.5 8-6.5s7.2 2.5 8 6.5" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6" /><circle cx="17" cy="9" r="2.6" /><path d="M16 14.2c2.8.1 4.9 2.3 5.5 5.8" /></>,
  handshake: <><path d="M2 12l4-4 4 1 3-2 4 1 5 4" /><path d="M6 8l-2 6 5 5 2-1 2 1 3-2 2-2-4-4" /><path d="M10 15l2 2M12 13l2.5 2.5" /></>,
  wall: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 5v4.7M6 9.7v4.6M12 9.7v4.6M18 9.7v4.6M9 14.3V19M15 14.3V19" /></>,
  sprout: <><path d="M12 21V11" /><path d="M12 11C12 7 9 5 4 5c0 4 3 6 8 6zM12 13c0-4 3-6 8-6 0 4-3 6-8 6z" /><path d="M7 21h10" /></>,
  hourglass: <><path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" /></>,
  infinity: <path d="M6.5 8.5a3.5 3.5 0 1 0 0 7c2.5 0 3.5-2 5.5-3.5S15 8.5 17.5 8.5a3.5 3.5 0 1 1 0 7c-2.5 0-3.5-2-5.5-3.5S9 8.5 6.5 8.5z" />,
  fog: <><path d="M3 8h13M6 12h15M3 16h12M8 20h10" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /><path d="M12 12 20 4M17 4h3v3" /></>,
  follow: <><path d="M4 7h6M4 12h6M4 17h6" /><path d="M13 7h7M13 12h7M13 17h7" strokeDasharray="1 2.5" /></>,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" /><path d="M12 7v3l1.5 1.5" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  cart: <><path d="M3 4h2.5l2 11h10.5l2-8H7" /><circle cx="9.5" cy="19" r="1.5" /><circle cx="16.5" cy="19" r="1.5" /></>,
  rocket: <><path d="M12 15c-1.5-1.5-3-3-3-6.5C9 5 12 2.5 12 2.5S15 5 15 8.5c0 3.5-1.5 5-3 6.5z" /><path d="M9 11 5.5 13l1 4L9 15M15 11l3.5 2-1 4L15 15" /><path d="M10.5 18.5 12 22l1.5-3.5" /><circle cx="12" cy="8" r="1.3" /></>,
  hand: <><path d="M3 14c2 0 3 .5 4.5 2H12a1.6 1.6 0 0 0 0-3.2H9.5" /><path d="M7.5 16 11 19c1.5 1.2 2.6 1.2 4 .4L21 16" /><path d="M14 10.5c1.5-1 3-1.5 3-3.3a1.8 1.8 0 0 0-3-1.3 1.8 1.8 0 0 0-3 1.3c0 1.8 1.5 2.3 3 3.3z" /></>,
  bird: <><path d="M4 15c3 0 4-2 5-4 1.5-3 4-5 7-4l3 1-3 1.5c0 4-3 8-8 8-2 0-3-1-4-2.5z" /><path d="M9 17.5 7 21M12 17l-.5 4" /><circle cx="15.5" cy="8.5" r=".8" /></>,
  scale: <><path d="M12 3v18M7 21h10M4 7h16" /><path d="M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z" /></>,
  coin: <><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></>,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  puzzle: <><path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H4v-4a2 2 0 1 0 0-4z" /></>,
  needle: <><path d="M20 4 6 18l-2 2M17 4h3v3" /><path d="M5 9c3-3 7 1 4 4s-7 3-5 6 7 1 10-2" /></>,
  lemon: <><ellipse cx="11" cy="13" rx="7" ry="6" transform="rotate(-30 11 13)" /><path d="M17 6.5 19.5 4M7 13c1-2 3-3.5 5-4" /></>,
  glass: <><path d="M6 4h12l-1.5 16h-9z" /><path d="M6.5 9h11M14 4l2-2.5" /><circle cx="10.5" cy="13" r=".8" /><circle cx="13" cy="16" r=".8" /></>,
  plane: <path d="M21 15.5 13.5 11V5.5a1.5 1.5 0 0 0-3 0V11L3 15.5V17l7.5-2.2v4.1L8.5 20.5V22l3.5-1 3.5 1v-1.5l-2-1.6v-4.1L21 17z" />,
  wheel: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 14.5V21M9.6 11.2 3.3 9.8M14.4 11.2l6.3-1.4" /></>,
  barrier: <><rect x="2" y="7" width="20" height="5" rx="1" /><path d="M5 7l-3 5M10 7l-3 5M15 7l-3 5M20 7l-3 5M5 12v8M19 12v8M3 20h4M17 20h4" /></>,
  question: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" /><circle cx="12" cy="17.2" r=".6" /></>,
  building: <><path d="M3 21h18M5 21V10M19 21V10M9 21v-8M15 21v-8M2 10l10-6 10 6z" /></>,
  money: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 9.5v5M18 9.5v5" /></>,
  passport: <><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3.5" /><path d="M8.5 10h7M12 6.5c1.3 1 1.3 6 0 7M9 17h6" /></>,
  alarm: <><circle cx="12" cy="13" r="7.5" /><path d="M12 9v4l2.5 2M4 4.5 6.5 2.5M20 4.5l-2.5-2" /></>,
  home: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20M10 9l3 2-3 2z" /></>,
  grad: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></>,
  sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" /></>,
  books: <><path d="M4 19V5a1 1 0 0 1 1-1h3v16H5a1 1 0 0 1-1-1zM8 4h4v16H8zM13 5.5l3.5-1 4 14.5-3.5 1z" /></>,
  chart: <><path d="M3 20h18M6 16l4-5 3 3 6-7" /><path d="M15 7h4v4" /></>,
  award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /><path d="m12 6 .9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1L9 8.2l2.1-.3z" /></>,
};

export type BrandIconName = keyof typeof G;
type Tone = "emerald" | "gold" | "muted" | "glass";

export function BrandIcon({ name, size = 64, tone = "emerald", className = "" }: { name: BrandIconName; size?: number; tone?: Tone; className?: string }) {
  return (
    <span className={`bi bi-${tone} ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="bi-glyph">
        <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{G[name]}</g>
      </svg>
    </span>
  );
}
