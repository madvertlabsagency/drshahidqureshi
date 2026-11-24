import Image from "next/image";
import { clientLogos, endorsements, gceCreatives, mediaAppearances, pullQuotes, studentVoices, type Endorsement } from "@/content/endorsements";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

function excerpt(q: string, n = 230) {
  if (q.length <= n) return { head: q, tail: "" };
  const cut = q.lastIndexOf(" ", n);
  return { head: q.slice(0, cut), tail: q.slice(cut) };
}

function EndorseCard({ e, dark }: { e: Endorsement; dark?: boolean }) {
  const { head, tail } = excerpt(e.quote);
  return (
    <figure className={`endorse${dark ? " endorse-dark" : ""}`}>
      <span className="qmark" aria-hidden="true">&ldquo;</span>
      <blockquote>
        {tail ? (
          <details>
            <summary>
              <span>{head}…</span> <em className="more">Read full endorsement</em>
            </summary>
            <span className="rest">{head}{tail}</span>
          </details>
        ) : (
          head
        )}
      </blockquote>
      <figcaption>
        <Image src={e.photo} alt={e.name} width={56} height={56} className="avatar" />
        <span>
          <b>{e.name}</b>
          <small>{e.title}{e.org ? ` · ${e.org}` : ""}</small>
        </span>
      </figcaption>
    </figure>
  );
}

/* Endorsements from thought leaders */
export function Endorsements() {
  const featured = endorsements.filter((e) => e.featured);
  const rest = endorsements.filter((e) => !e.featured);
  return (
    <section className="endorse-sec grad-emerald on-dark" id="endorsements">
      <div className="watermark" aria-hidden="true"><LogoMark className="wm-mark" /></div>
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Endorsements from thought leaders</span>
          <h2>
            When Professors From TU Berlin, LUMS, Durham &amp; Ottawa <span className="gold-text">Speak About Your Teacher…</span>
          </h2>
          <p className="lead">
            You don&apos;t have to take our word for it. These are the people who have taught, researched and built institutions alongside Dr. Shahid — in their own words.
          </p>
        </Reveal>

        <div className="pull-quotes">
          {pullQuotes.map((p, i) => (
            <Reveal key={p.by} delay={0.1 * i} className="pq">
              <p>&ldquo;{p.quote}&rdquo;</p>
              <span>— {p.by}</span>
            </Reveal>
          ))}
        </div>

        <div className="endorse-featured">
          {featured.map((e, i) => (
            <Reveal key={e.name} delay={0.08 * i}>
              <EndorseCard e={e} dark />
            </Reveal>
          ))}
        </div>

        <div className="endorse-wall">
          {rest.map((e, i) => (
            <Reveal key={e.name} delay={(i % 3) * 0.06}>
              <EndorseCard e={e} />
            </Reveal>
          ))}
        </div>

        <div className="faces" aria-label="Endorsers">
          {[...endorsements, ...studentVoices].map((e) => (
            <Image key={e.name} src={e.photo} alt={e.name} title={e.name} width={44} height={44} />
          ))}
          <span>{endorsements.length + studentVoices.length} leaders, professors &amp; alumni</span>
        </div>
        <p className="center src-note">Source: drshahidqureshi.com/testimonials — reproduced verbatim.</p>
      </div>
    </section>
  );
}

/* Former students — relatable proof */
export function StudentVoices() {
  return (
    <div className="voices">
      {studentVoices.map((e, i) => (
        <Reveal key={e.name} delay={0.08 * i}>
          <EndorseCard e={e} />
        </Reveal>
      ))}
    </div>
  );
}

/* Organisation logo strip */
export function LogoStrip() {
  return (
    <section className="logo-strip" aria-label="Organisations Dr. Shahid has worked with">
      <div className="container">
        <p>Programs &amp; trainings delivered for teams at</p>
        <div className="logos">
          {clientLogos.map((l) => (
            <Image key={l.name} src={l.src} alt={l.name} width={96} height={96} />
          ))}
        </div>
      </div>
    </section>
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
