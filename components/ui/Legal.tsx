import { Shell } from "./Shell";
import { Ph } from "./Ph";

export function Legal({ title, sections }: { title: string; sections: [string, React.ReactNode][] }) {
  return (
    <Shell title={title} lead="Last updated: [date]">
      <article className="card legal narrow">
        <p><Ph>Draft template — must be reviewed and approved by the school&apos;s legal advisor before launch</Ph></p>
        {sections.map(([h, b]) => (
          <section key={h} style={{ padding: 0 }}>
            <h2>{h}</h2>
            <div>{b}</div>
          </section>
        ))}
      </article>
    </Shell>
  );
}
