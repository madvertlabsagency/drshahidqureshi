"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const principles = [
  { n: "01", name: "Bird-in-Hand", tag: "Start with who you are, what you know and whom you know.", body: "You don't begin with the perfect idea. You begin with your identity, knowledge and network — the resources already in your hand today.", ask: ["Try this now:", "list three skills, three things you know deeply and five people who'd take your call. That's your starting capital."] },
  { n: "02", name: "Affordable Loss", tag: "Decide what you can afford to lose — not what you hope to win.", body: "Instead of betting everything on a forecast, you set a boundary on the money, time and reputation you're willing to invest in a step — and act within it.", ask: ["The shift:", "fear of failure shrinks when the worst case is a number you've already accepted."] },
  { n: "03", name: "Crazy Quilt", tag: "Build with people who choose to commit.", body: "Partners, early customers and supporters bring resources and shape the venture with you. Pre-commitments reduce uncertainty more than any market report.", ask: ["The shift:", "you stop hunting for investors and start building a coalition."] },
  { n: "04", name: "Lemonade", tag: "Turn surprises into opportunities.", body: "The unexpected — a lost client, a market shock, a strange request — isn't only a threat to avoid. It can be raw material for something new.", ask: ["The shift:", "setbacks stop being proof you “weren't meant for business”."] },
  { n: "05", name: "Pilot-in-the-Plane", tag: "Focus on what you can control.", body: "You may not control the economy, the market or the headlines. You can control your next action, your partnerships and your decisions — and through them, shape the future.", ask: ["The shift:", "from waiting for conditions to improve, to creating them yourself."] },
];

export function Principles() {
  const [i, setI] = useState(0);
  const p = principles[i];
  return (
    <div className="principles">
      <div className="p-tabs" role="tablist" aria-label="Five principles of Effectuation">
        {principles.map((x, k) => (
          <button key={x.n} role="tab" aria-selected={k === i} className={`p-tab${k === i ? " active" : ""}`} onClick={() => setI(k)}>
            <b>{x.n}</b>
            <span>{x.name}</span>
          </button>
        ))}
      </div>
      <div className="p-panel" role="tabpanel">
        <span className="big" aria-hidden="true">{p.n}</span>
        <AnimatePresence mode="wait">
          <motion.div key={p.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <h3>{p.name}</h3>
            <p className="tagq">{p.tag}</p>
            <p>{p.body}</p>
            <div className="ask">
              <strong>{p.ask[0]}</strong> {p.ask[1]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export interface Module {
  title: string;
  summary: string;
  points: string[];
}

export function Curriculum({ modules }: { modules: Module[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="modules">
      {modules.map((m, k) => (
        <div key={m.title} className={`mod${open === k ? " open" : ""}`}>
          <button className="mod-head" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>
            <span className="num">{String(k + 1).padStart(2, "0")}</span>
            <h3>{m.title}</h3>
            <span className="pm" />
          </button>
          <div className="mod-body">
            <div>
              <div className="inner">
                <p>{m.summary}</p>
                <ul>
                  {m.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const all = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {all.map((c, k) => (
          <span key={k}>{c}</span>
        ))}
      </div>
    </div>
  );
}
