import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { YouTube } from "@/components/ui/YouTube";
import { Principles } from "./Interactive";
import { LogoMark } from "@/components/ui/Logo";
import { HeroTrust, MediaWall } from "./Authority";
import { RoadblockArt, TransformFlip } from "./Visual";
import { photo } from "@/lib/assets";

/* 01, Announcement bar */
export function Announcement() {
  const d = site.enrollment;
  return (
    <div className="announce">
      <b>GCE BATCH 10</b> · Enrollment is now open
      {d.commencementDate ? <>, classes begin {d.commencementDate}</> : <>, the next chapter of entrepreneurial education</>}.
      <a href="#pricing">Explore pathways →</a>
    </div>
  );
}

/* 02, Hero + VSL */
export function Hero() {
  const v = site.videos.vsl;
  return (
    <section className="hero grad-emerald on-dark" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <Image src="/img/site/world-pins.webp" alt="" fill sizes="100vw" priority style={{ objectFit: "cover" }} />
      </div>
      <div className="watermark" aria-hidden="true"><LogoMark className="wm-mark" /></div>
      <div className="container">
        <Reveal><HeroTrust /></Reveal>
        <Reveal className="badge-pill">
          <i>Batch 10</i> Global Certificate in Entrepreneurship
        </Reveal>
        <Reveal delay={0.1}>
          <h1 id="hero-title">
            You Don&apos;t Need More Resources to Begin.
            <br />
            <span className="gold-text">You Need a Different Way of Thinking.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead">
            The internationally recognised entrepreneurship program that has reshaped how {site.stats.participants.toLocaleString()}+ founders, professionals and business owners
            across {site.stats.countries} countries see opportunity, starting with what they <em>already</em> have.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <YouTube
            variant="vsl"
            id={v.youtubeId}
            title={v.title}
            label={`Watch ${v.label.charAt(0).toLowerCase()}${v.label.slice(1)}`}
            poster="/img/site/dsq-stage.webp"
            eyebrow="GCE · BATCH 10 · A PERSONAL INTRODUCTION"
            headline={
              <>
                Discover the
                <br />
                <em>Entrepreneurial</em>
                <br />
                Mindset.
              </>
            }
          />
        </Reveal>
        <Reveal delay={0.4} className="cta-row center">
          <Button href="/enroll" size="lg" trackId="hero_get_enrolled">Get Enrolled in GCE Batch 10</Button>
          <Button href="#about" variant="ghost" trackId="hero_secondary">See Why This Works</Button>
        </Reveal>
        <div className="tagline">
          <span>Live Online Learning</span>
          <span>Practical Frameworks</span>
          <span>Global Community</span>
        </div>
      </div>
    </section>
  );
}

/* 03, Credibility strip */
export function Credibility() {
  const s = site.stats;
  return (
    <section className="cred" aria-label="Program credibility">
      <div className="container">
        <Reveal className="cred-card">
          <div className="stat"><Counter to={s.participants} suffix="+" /><span>GCE Participants</span></div>
          <div className="stat"><Counter to={s.batches} /><span>Previous Batches</span></div>
          <div className="stat"><Counter to={s.countries} /><span>Countries</span></div>
          <div className="stat"><Counter to={s.yearsTeaching} suffix="+" /><span>Years Teaching</span></div>
          <div className="award-chip">
            <Icon name="award" />
            <div>
              <span className="yr">USASBE · 2017 &amp; 2021</span>
              <small>Outstanding Entrepreneurship Program Awards, United States Association for Small Business &amp; Entrepreneurship</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 04, The problem */
const personas: { icon: IconName; title: string; body: string; quote: React.ReactNode }[] = [
  { icon: "briefcase", title: "The Professional Seeking Independence", body: "Good salary, respected title, and a growing feeling that you're building someone else's dream.", quote: "“I can't keep doing this for the next 20 years. But I can't just quit either.”" },
  { icon: "bulb", title: "The Aspiring Entrepreneur", body: "Ideas in your notes app, business videos in your history, and no clear first move.", quote: <>&ldquo;Everyone says &lsquo;just start&rsquo;. Start <em>what</em>? With <em>what</em>?&rdquo;</> },
  { icon: "store", title: "The Existing Business Owner", body: "The business runs, but on your shoulders. Growth feels like guesswork, and the team waits for you.", quote: "“I built a job for myself, not a business.”" },
];

export function Problem() {
  return (
    <section className="sec-ivory" id="problem">
      <div className="container split">
        <Reveal>
          <span className="eyebrow">Be honest with yourself for a moment</span>
          <h2>
            You&apos;ve Been Thinking About Building Something of Your Own. <span className="emerald-text">So What&apos;s Really Holding You Back?</span>
          </h2>
          <p>You&apos;ve spent years building skills. You&apos;ve worked hard, gained experience, and watched others, sometimes <em>less</em> capable than you, build businesses of their own.</p>
          <p>Yet every time you sit down late at night and seriously consider starting something, the same questions walk back into the room:</p>
          <ul className="q-list">
            <li>Where do I even begin?</li>
            <li>What if I don&apos;t have enough capital?</li>
            <li>How do I find the <em>right</em> opportunity?</li>
            <li>What if I make a costly mistake, with my family watching?</li>
            <li>How do I build this while carrying my existing responsibilities?</li>
          </ul>
          <p>So you wait. For more savings. More certainty. &ldquo;The right time.&rdquo; And another year quietly slips by.</p>
          <p className="pull" style={{ marginTop: 28 }}>
            What if the first step isn&apos;t finding more resources, but learning to see the possibilities hiding inside the ones you already have?
          </p>
        </Reveal>
        <div className="persona-stack">
          {personas.map((p, i) => (
            <Reveal key={p.title} delay={0.1 * (i + 1)} className="persona">
              <span className="ico"><Icon name={p.icon} /></span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <q>{p.quote}</q>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 05, Hidden roadblock */
export function Roadblock() {
  return (
    <section className="sec-white" id="about">
      <div className="container">
        <div className="road-split">
        <Reveal className="road-copy">
          <span className="eyebrow">The roadblock nobody told you about</span>
          <h2>
            What If the Way You Were Taught to Think About Business Is <span className="hl">Incomplete?</span>
          </h2>
          <p className="lead">
            Most business education begins with a business plan, a market forecast, financial projections, and a capital requirement. Valuable tools. But they quietly assume
            you can <strong>predict</strong> the future and <strong>buy</strong> the resources to reach it.
          </p>
          <p className="lead">
            So when the future is uncertain and resources are limited, exactly where most of us are, the plan says <em>&ldquo;not yet&rdquo;</em>. And &ldquo;not yet&rdquo; slowly
            becomes &ldquo;never&rdquo;.
          </p>
          <p className="lead">Research on how expert entrepreneurs actually think points somewhere else. They rarely start with <em>&ldquo;What do I need to achieve my goal?&rdquo;</em></p>
          <p className="pull">They start with: &ldquo;What can I create with what I already have?&rdquo;</p>
        </Reveal>
        <Reveal delay={0.15}><RoadblockArt /></Reveal>
        </div>
        <div className="compare">
          <Reveal className="path path-a">
            <h3>Prediction Led Thinking</h3>
            <p className="sub">Begin with a predefined goal</p>
            <ol><li>Define the goal</li><li>Forecast the market</li><li>Acquire the resources</li><li>Execute the plan</li></ol>
          </Reveal>
          <div className="vs">+</div>
          <Reveal delay={0.15} className="path path-b">
            <h3>Effectual Thinking</h3>
            <p className="sub">Begin with available means</p>
            <ol><li>Discover your resources</li><li>Explore possibilities</li><li>Build partnerships</li><li>Adapt through action</li></ol>
          </Reveal>
        </div>
        <p className="center" style={{ marginTop: 28, color: "var(--muted)" }}>
          Both have their place. The entrepreneurs who thrive know <strong>when</strong> to use each. Most people were only ever taught the first.{" "}
          <a href="#principles" className="btn-link">This is where Effectuation changes the conversation <Icon name="arrow" size={16} /></a>
        </p>
      </div>
    </section>
  );
}

/* 06, Mindset transformation */
export function Mindset() {
  return (
    <section className="sec-ivory-2">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Na umeedi se umeed ki taraf</span>
          <h2>
            The Greatest Transformation <span className="emerald-text">Begins Within.</span>
          </h2>
          <p className="lead">GCE develops entrepreneurial capability, but its deeper work is on the mindset behind meaningful action. The work stays the same. The way you see it changes everything.</p>
        </Reveal>
        <TransformFlip />
        <Reveal className="narrow center" >
          <p className="lead" style={{ marginTop: 48 }}>
            Imagine walking into uncertainty with <strong>curiosity instead of a knot in your stomach</strong>. Seeing an opening where you used to see a wall. Hearing your family
            say, <em>&ldquo;Since that course, you think differently&rdquo;</em>, and knowing exactly what they mean.
          </p>
          <div className="cta-row center" style={{ marginTop: 28 }}>
            <Button href="#principles" variant="emerald" trackId="mindset_discover">Discover the GCE Approach</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 07, Five principles of Effectuation */
export function Effectuation() {
  const reading = photo("/img/moments/dsq-reading.webp");
  return (
    <section className="grad-emerald on-dark" id="principles">
      <div className="watermark left" aria-hidden="true"><LogoMark className="wm-mark" /></div>
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">The mechanism · a free lesson before we ask for anything</span>
          <h2>
            Five Principles That Change How You <span className="gold-text">Approach Entrepreneurship.</span>
          </h2>
          <p className="lead">Effectuation, the decision making logic studied in expert entrepreneurs, begins with available means and focuses on what you can control, not what you can predict. Tap each principle.</p>
        </Reveal>
        {reading && (
          <Reveal className="reading-orb">
            <Image src={reading} alt="Dr. Shahid Qureshi reading Effectual Entrepreneurship" width={260} height={260} />
            <span>The framework at the heart of GCE</span>
          </Reveal>
        )}
        <Reveal>
          <Principles />
        </Reveal>
        <p className="center" style={{ marginTop: 44, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          Knowing these five ideas is the easy 1%. <strong style={{ color: "var(--gold)" }}>Living them</strong>, in your career, your business and your decisions, is what GCE
          is built to help you do.
        </p>
      </div>
    </section>
  );
}

/* 08, E+ model */
export function EPlus() {
  const cards = [
    ["E", "Entrepreneurial Thinking", "Effectuation, opportunity recognition and practical frameworks to build under uncertainty."],
    ["+", "Values & Purpose", "Ethical trade, responsibility and service as foundations, not afterthoughts, of how you build and lead."],
    ["=", "Meaningful Impact", "Businesses where people grow, customers are served with excellence and success has a deeper meaning."],
  ];
  return (
    <section className="grad-emerald on-dark deep">
      <div className="gold-rule" style={{ position: "absolute", top: 0, left: 0 }} />
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">The Entrepreneurship Plus (E+) Model</span>
          <h2>
            Entrepreneurship Is About More Than <span className="gold-text">Making Money.</span>
          </h2>
          <p className="lead">
            What if your business could change the lives of your employees, your customers and your family, not just your bank balance? The award-winning E+ approach connects
            entrepreneurial thinking with values, human development and meaningful impact.
          </p>
        </Reveal>
        <div className="eplus">
          {cards.map(([n, t, b], i) => (
            <Reveal key={t} delay={0.1 * (i + 1)} className="eplus-card">
              <div className="n gold-text">{n}</div>
              <h3>{t}</h3>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="eplus-quote">
          People Are the Purpose.
          <br />
          <span className="gold-text">Business Is the Tool.</span>
        </Reveal>
        <p className="center" style={{ marginTop: 18, opacity: 0.85 }}>
          Tijarat karte hue bande Allah ke ho jayein, that is the deeper aim behind the EhsanX approach.
        </p>
      </div>
    </section>
  );
}

/* 09, Product reveal */
const benefits: { icon: IconName; t: string; b: string }[] = [
  { icon: "eye", t: "Discover Opportunities", b: "Recognise possibilities inside your existing environment, skills, networks and markets you walk past every day." },
  { icon: "chart", t: "Develop Real Capabilities", b: "Practical approaches to entrepreneurial marketing, people, money and strategy, real business skills, not slides." },
  { icon: "compass", t: "Navigate Uncertainty", b: "Experiment, build partnerships and manage affordable risks instead of waiting for the “perfect time”." },
  { icon: "heart", t: "Build With Purpose", b: "Connect every business decision with values, responsibility and impact that outlives the balance sheet." },
];

export function ProductReveal() {
  return (
    <section className="sec-ivory">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Introducing</span>
          <h2 className="reveal-title">
            Global Certificate in <span className="emerald-text">Entrepreneurship</span>
          </h2>
          <span className="batch-tag">BATCH 10</span>
          <p className="lead" style={{ marginTop: 28 }}>
            More than a business course. A structured journey that combines entrepreneurial theory, practical frameworks, real world experience and purpose driven learning,
            led personally by Dr. Shahid Qureshi.
          </p>
          <p className="lead">
            Whether you&apos;re exploring your first opportunity, growing an existing venture or bringing entrepreneurial thinking into your career, GCE gives you the{" "}
            <strong>zaviya</strong>, the angle of seeing business, that most business schools never teach.
          </p>
        </Reveal>
        <Reveal className="product-visual">
          <Image src="/img/site/batch10-banner.webp" alt="GCE Batch 10, Don't just learn entrepreneurship, build something that matters. Starts 9 January 2027." width={1600} height={666} sizes="(max-width:1200px) 100vw, 1150px" />
          <div className="pv-side">
            <Image src="/img/site/dsq-gce-desk.webp" alt="Dr. Shahid Qureshi, Global Certificate in Entrepreneurship" width={600} height={600} sizes="320px" />
          </div>
        </Reveal>
        <div className="benefits">
          {benefits.map((b, i) => (
            <Reveal key={b.t} delay={0.08 * (i + 1)} className="benefit">
              <div className="ico"><Icon name={b.icon} /></div>
              <h3>{b.t}</h3>
              <p>{b.b}</p>
            </Reveal>
          ))}
        </div>
        <div className="cta-row center" style={{ marginTop: 48 }}>
          <Button href="#curriculum" variant="emerald" trackId="reveal_curriculum">Explore What You&apos;ll Learn</Button>
        </div>
      </div>
    </section>
  );
}

/* 10, Mentor */
export function Mentor() {
  return (
    <section className="sec-white" id="mentor">
      <div className="container split">
        <Reveal as="figure" className="mentor-photo">
          <Image src="/img/sir/classroom-standing.webp" alt="Dr. Shahid Qureshi in the classroom" fill sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
          <figcaption className="cap">
            <b>Dr. Shahid Qureshi</b>
            <span>Entrepreneur · Educator · Institution Builder</span>
          </figcaption>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow">The educator behind the experience</span>
          <h2>
            Learn From Experience. <span className="emerald-text">Not Just Theory.</span>
          </h2>
          {site.mentor.bio ? (
            <p>{site.mentor.bio}</p>
          ) : (
            <>
              <p>For more than two decades, Dr. Shahid Qureshi has done one thing with unusual focus: helping ordinary people develop the mindset to build purpose driven ventures.</p>
              <p>
                He has trained <strong>{site.stats.trained.toLocaleString()}+ entrepreneurs and managers</strong> across the globe, designed entrepreneurship programs recognised
                twice by the United States Association for Small Business &amp; Entrepreneurship, and served on the board of IGNITE, the Government of Pakistan&apos;s National
                Technology Fund, as it initiated five National Incubation Centres.
              </p>
            </>
          )}
          <ul className="creds">
            {site.mentor.credentials.map((c, i) => (
              <li key={c}>
                <Icon name={(["cert", "store", "briefcase", "chart", "award", "award", "globe", "users", "globe"] as IconName[])[i] || "check"} />
                {c}
              </li>
            ))}
          </ul>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <Button href="#pricing" trackId="mentor_learn_directly">Learn Directly From Dr. Shahid</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Podcasts, Sir in his own words (YouTube) */
export function Podcasts() {
  return (
    <section className="sec-ivory-2" id="podcasts">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Hear it from Dr. Shahid himself</span>
          <h2>
            Before You Decide, <span className="emerald-text">Listen to How He Thinks.</span>
          </h2>
          <p className="lead">Two conversations that capture the heart of GCE: why mindset, not money, is your real starting capital, and why people, not profit, are the purpose of business.</p>
        </Reveal>
        <div className="grid-2 podcast-grid">
          {site.videos.podcasts.map((v, i) => (
            <Reveal key={v.youtubeId} delay={0.1 * (i + 1)} className="podcast">
              <YouTube id={v.youtubeId} title={v.title} />
              <div className="podcast-meta">
                <small>{v.label}</small>
                <h3>{v.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="center" >
          <span className="eyebrow" style={{ marginTop: 72 }}>As seen in interviews, news &amp; podcasts</span>
        </Reveal>
        <MediaWall />
      </div>
    </section>
  );
}
