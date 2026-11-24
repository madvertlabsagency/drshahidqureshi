import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Minimal, distraction-free shell for funnel sub-pages. */
export function Shell({
  children,
  eyebrow,
  title,
  lead,
  steps,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  steps?: { labels: string[]; active: number };
}) {
  return (
    <div className="page-min">
      <Nav minimal />
      <main>
        <section className="sub-hero grad-emerald on-dark">
          <div className="container">
            {steps && (
              <div className="steps" aria-label="Progress">
                {steps.labels.map((l, i) => (
                  <span key={l} style={{ display: "contents" }}>
                    {i > 0 && <span className="sep" />}
                    <span className={i <= steps.active ? "on" : ""} style={{ color: i <= steps.active ? "var(--gold)" : "rgba(250,250,247,.6)" }}>
                      <i>{i + 1}</i>
                      {l}
                    </span>
                  </span>
                ))}
              </div>
            )}
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </div>
        </section>
        <div className="container pull-up" style={{ paddingBottom: 100 }}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function SideSummary({ children }: { children: React.ReactNode }) {
  return (
    <aside className="card grad-emerald on-dark side-sum" style={{ border: 0 }}>
      {children}
    </aside>
  );
}
