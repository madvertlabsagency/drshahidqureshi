import Image from "next/image";
import Link from "next/link";
import { formatPKR, site } from "@/content/site";
import { Button, whatsappHref } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IS_DEV, Ph, Val } from "@/components/ui/Ph";
import { Reveal } from "@/components/ui/Reveal";
import { YouTube } from "@/components/ui/YouTube";
import { Curriculum, Marquee, type Module } from "./Interactive";
import { CaseStudies, CostVisual, CreativeStrip, StoriesMarquee } from "./Authority";
import { FlagGather } from "./Visual";
import { LogoMark } from "@/components/ui/Logo";
import { photo } from "@/lib/assets";

/* 11, International recognition */
export function Recognition() {
  return (
    <section className="sec-white">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Show, don&apos;t tell</span>
          <h2>
            A Teaching Approach Recognised <span className="emerald-text">Beyond Borders.</span>
          </h2>
          <p className="lead">
            USASBE awarded its Outstanding Entrepreneurship Program Awards in 2017 and 2021 to entrepreneurship programs designed and executed by Dr. Shahid Qureshi,
            recognising their exceptional impact and innovation in entrepreneurship education.
          </p>
        </Reveal>
        <div className="rec-grid">
          <Reveal as="figure" className="rec-item tall">
            <Image src="/img/usasbe-award-2.webp" alt="Dr. Shahid Qureshi receiving the USASBE Outstanding Entrepreneurship Program Award" fill sizes="(max-width:800px) 100vw, 640px" style={{ objectFit: "cover" }} />
            <figcaption><b>USASBE · United States</b>Receiving the Outstanding Entrepreneurship Program Award</figcaption>
          </Reveal>
          <Reveal as="figure" delay={0.1} className="rec-item">
            <Image src="/img/usasbe-award-1.webp" alt="Dr. Shahid Qureshi at the USASBE conference" fill sizes="(max-width:800px) 100vw, 520px" style={{ objectFit: "cover" }} />
            <figcaption><b>USASBE Conference</b>International recognition for entrepreneurship education</figcaption>
          </Reveal>
          <Reveal as="figure" delay={0.2} className="rec-item">
            <Image src="/img/ignite-pm.webp" alt="IGNITE National Incubation Centres launch event" fill sizes="(max-width:800px) 100vw, 520px" style={{ objectFit: "cover" }} />
            <figcaption><b>IGNITE · National Technology Fund</b>As a board member, part of initiating five National Incubation Centres</figcaption>
          </Reveal>
        </div>
        <div className="rec-blocks">
          <Reveal className="rec-block"><b>International Recognition</b><p>USASBE Outstanding Entrepreneurship Program Awards, 2017 &amp; 2021.</p></Reveal>
          <Reveal delay={0.08} className="rec-block"><b>Ecosystem Building</b><p>IGNITE board member during the launch of five National Incubation Centres.</p></Reveal>
          <Reveal delay={0.16} className="rec-block"><b>Global Teaching</b><p>PhD from TU Berlin, Babson Fellow, and local &amp; global teaching collaborations. <Ph>Verified countries &amp; universities</Ph></p></Reveal>
          <Reveal delay={0.24} className="rec-block"><b>Students Travel to Learn</b><p>{site.stats.internationalVisitors}+ international participants have travelled to Pakistan to study this content, incl. the IBA International Entrepreneurship Summer School.</p></Reveal>
        </div>
        <p className="center" style={{ marginTop: 18, fontSize: ".78rem", color: "var(--muted)" }}>Event photographs are shown for historical professional context and do not imply political endorsement.</p>
      </div>
    </section>
  );
}

/* 12, Global community */
export function Community() {
  const s = site.stats;
  return (
    <section className="grad-emerald on-dark">
      <div className="watermark" aria-hidden="true"><LogoMark className="wm-mark" /></div>
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">The GCEians</span>
          <h2>
            Different Countries. Different Backgrounds. <span className="gold-text">One Entrepreneurial Mindset.</span>
          </h2>
          <p className="lead">Entrepreneurship isn&apos;t limited to one country, profession or stage of life. GCE brings together people from across the world who share one trait: they&apos;d rather build than wait.</p>
        </Reveal>
        <Reveal className="stat-row">
          <div className="stat"><Counter to={s.countries} /><span>Countries</span></div>
          <div className="stat"><Counter to={s.cities} /><span>Cities</span></div>
          <div className="stat"><Counter to={s.participants} suffix="+" /><span>Participants</span></div>
          <div className="stat"><Counter to={s.batches} /><span>Previous Batches</span></div>
        </Reveal>
        <FlagGather />
        {IS_DEV && <p className="center" style={{ marginTop: 14, fontSize: ".78rem", opacity: 0.6 }}><Ph>Confirm GCE-only country list</Ph></p>}
        <Moments />
        <div className="cta-row center" style={{ marginTop: 36 }}>
          <Button href="#pricing" trackId="community_become_gceian">Become a GCEian</Button>
        </div>
      </div>
    </section>
  );
}

/* 13, Stories & testimonials */
export function Stories() {
  const fa = site.featuredAlumni;
  return (
    <section className="sec-ivory" id="stories">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Will this work for someone like me?</span>
          <h2>
            Real People. Real Experiences. <span className="emerald-text">Meaningful Learning.</span>
          </h2>
          <p className="lead">
            Founders, professionals and learners from across the world, including well known names like <strong>Dr. Amjad Saqib</strong>, have been through Dr. Shahid&apos;s
            entrepreneurship education. Here&apos;s how they describe it.
          </p>
        </Reveal>

        <CaseStudies />
      </div>
      <div className="stories-marquee">
        <div className="container"><h3 className="center sm-title">What Students, Colleagues &amp; Viewers Say</h3></div>
        <StoriesMarquee />
      </div>
      <div className="container">
        {(IS_DEV || fa.quote) && <Reveal className="featured-story">
          <div className="media">
            {fa.youtubeId ? <YouTube id={fa.youtubeId} title={`${fa.name}, alumni story`} /> : <Image src="/img/sir/speaking-mic.webp" alt="" fill sizes="500px" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />}
          </div>
          <div className="body">
            <span className="eyebrow">Featured alumni story</span>
            <h3>{fa.name}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>{fa.role}</p>
            <blockquote><Val v={fa.quote} ph="Approved interview pull-quote in Saad's exact words" /></blockquote>
            <Ph>Featured placement subject to permission · add YouTube ID in content/site.ts</Ph>
          </div>
        </Reveal>}
      </div>
    </section>
  );
}

/* 14, Who should join */
const audiences: { icon: IconName; t: string; b: string }[] = [
  { icon: "briefcase", t: "Corporate Professionals", b: "Explore opportunities beyond your current role, without rushing into unnecessary risk." },
  { icon: "bulb", t: "Aspiring Entrepreneurs", b: "Identify opportunities and begin with the capabilities you already have." },
  { icon: "store", t: "Existing Business Owners", b: "New approaches to innovation, growth, people and better decisions." },
  { icon: "plane", t: "GCC Based Professionals", b: "Build an entrepreneurial path while managing your career and commitments abroad." },
  { icon: "woman", t: "Women Entrepreneurs", b: "Build around your strengths, circumstances and ambitions, on your terms." },
  { icon: "family", t: "Family Business Successors", b: "Innovate, lead responsibly and evolve the business you've inherited." },
];

export function WhoFor() {
  return (
    <section className="sec-white">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Is GCE right for you?</span>
          <h2>
            Wherever You Are in Your Journey, Entrepreneurial Thinking <span className="emerald-text">Moves You Forward.</span>
          </h2>
        </Reveal>
        <div className="grid-3" style={{ marginTop: 44 }}>
          {audiences.map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 0.08} className="aud">
              <div className="ico"><Icon name={a.icon} /></div>
              <h3>{a.t}</h3>
              <p>{a.b}</p>
            </Reveal>
          ))}
        </div>
        <div className="fit">
          <Reveal className="fit-card fit-yes">
            <h3>GCE is for you if…</h3>
            <ul>
              {["You're willing to question assumptions you've carried for years.", "You want to apply what you learn, not just collect certificates.", "You believe business should create value, not just extract it.", "You'll invest real time each week in your own growth."].map((x) => (
                <li key={x}><Icon name="check" />{x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="fit-card fit-no">
            <h3>GCE is <u>not</u> for you if…</h3>
            <ul>
              {["You want guaranteed income or an overnight “get rich” formula.", "You plan to watch sessions passively and expect results anyway.", "You need an accredited MBA degree rather than a certificate based program."].map((x) => (
                <li key={x}><Icon name="x" />{x}</li>
              ))}
            </ul>
            <p style={{ marginTop: 18, fontSize: ".93rem", color: "var(--muted)" }}>We&apos;d rather tell you now than take your fee. Honest fit matters more to us than numbers.</p>
          </Reveal>
        </div>
        <div className="cta-row center" style={{ marginTop: 40 }}>
          <Button href="#pricing" trackId="whofor_find_pathway">Find Your Learning Pathway</Button>
        </div>
      </div>
    </section>
  );
}

/* 15, Curriculum */
const modules: Module[] = [
  { title: "Entrepreneurial Mindset", summary: "Opportunity, uncertainty, creativity and the thinking patterns of entrepreneurs.", points: ["Understand how entrepreneurs actually think", "Identify and dismantle limiting assumptions", "Develop an opportunity oriented perspective"] },
  { title: "Effectuation Theory & the E+ Model", summary: "The five principles in practice, and the award-winning Entrepreneurship Plus pedagogy.", points: ["Bird in Hand, Affordable Loss, Crazy Quilt, Lemonade, Pilot in the Plane", "When to use effectuation vs causation", "Purpose driven venture design"] },
  { title: "Entrepreneurial Marketing", summary: "Finding, understanding and serving customers with limited resources.", points: ["Customer discovery conversations", "Low cost validation before big commitments", "Building a brand people trust"] },
  { title: "People & Money Management", summary: "Leading teams and managing finances the way growing ventures need.", points: ["Building and leading a values driven team", "Cash flow, pricing and financial discipline", "Deciding with incomplete information"] },
  { title: "Scaling Up & Strategy", summary: "From founder dependent to a business that grows beyond you.", points: ["Systems, partnerships and growth strategy", "Innovation inside existing businesses", "Local and global perspectives"] },
  { title: "Values & Meaning in Life", summary: "Connecting trade, purpose and responsibility, business as a means, people as the purpose.", points: ["Ethical decision making in business", "Purpose to practice: aligning work and values", "Building a legacy, not just a company"] },
];

export function CurriculumSection() {
  return (
    <section className="sec-ivory-2" id="curriculum">
      <div className="container split" style={{ alignItems: "start" }}>
        <Reveal className="sticky-col">
          <span className="eyebrow">Your learning journey</span>
          <h2>
            Six Core Modules. <span className="emerald-text">One Integrated Approach.</span>
          </h2>
          <p className="lead">A structured journey through the mindset, frameworks and capabilities behind building, and growing, meaningful businesses.</p>
          <p style={{ marginTop: 18, color: "var(--muted)", fontSize: ".92rem" }}>
            Executive entrepreneurship programs at leading international business schools teach parts of this, at a cost most of us can never justify. GCE brings it together
            in one cohort, led by the educator who designed it.
          </p>
          <div className="cta-row" style={{ marginTop: 28 }}>
            <Button href="#pricing" trackId="curriculum_enroll_options">Explore Enrollment Options</Button>
          </div>
        </Reveal>
        <div>
          <Curriculum modules={modules} />
          <p style={{ marginTop: 14 }}><Ph>Proposed module descriptions, confirm official curriculum, durations &amp; guest speakers</Ph></p>
        </div>
      </div>
    </section>
  );
}

/* 16, Learning experience */
export function Experience() {
  const l = site.logistics;
  const items: { icon: IconName; t: string; b: string }[] = [
    { icon: "video", t: "Live Online Sessions", b: `${l.schedule}, learn live with Dr. Shahid from anywhere in the world.` },
    { icon: "tool", t: "Practical Learning", b: "Frameworks applied to real business situations, yours included." },
    { icon: "mic", t: "Guest Perspectives", b: "National and international resource persons and entrepreneurs." },
    { icon: "compass", t: "Mentorship", b: "Guidance and coaching according to your selected pathway." },
    { icon: "users", t: "The GCEian Community", b: `Connect with fellow learners across ${site.stats.countries} countries.` },
    { icon: "cert", t: "Certificate", b: "Awarded on completing your pathway's requirements." },
  ];
  return (
    <section className="grad-emerald on-dark">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">What it actually looks like</span>
          <h2>
            Experience Entrepreneurship. <span className="gold-text">Don&apos;t Just Read About It.</span>
          </h2>
        </Reveal>
        <div className="grid-3" style={{ marginTop: 44 }}>
          {items.map((x, i) => (
            <Reveal key={x.t} delay={(i % 3) * 0.08} className="exp">
              <span className="ico"><Icon name={x.icon} /></span>
              <div><h3>{x.t}</h3><p>{x.b}</p></div>
            </Reveal>
          ))}
        </div>
        <CreativeStrip />
        <Reveal className="logistics">
          <div><b>Format</b><span>{l.format}</span></div>
          <div><b>Schedule</b><span>{l.schedule}</span></div>
          <div><b>Morning cohort</b><span>{l.morning} <Val v={l.timeZone} ph="TZ" /></span></div>
          <div><b>Evening cohort</b><span>{l.evening} <Val v={l.timeZone} ph="TZ" /></span></div>
          <div><b>Duration</b><span>8, 12 or 16 weeks</span></div>
          <div><b>Language</b><span><Val v={l.language} ph="Confirm" /></span></div>
          <div><b>Commencement</b><span><Val v={site.enrollment.commencementDate} ph="Start date" /></span></div>
          <div><b>Seats</b><span><Val v={site.enrollment.seats ? `${site.enrollment.seats} per cohort` : null} ph="Cohort size" /></span></div>
        </Reveal>
      </div>
    </section>
  );
}

/* 17, Bonus stack */
const bonuses = [
  ["The Resource Discovery Workbook", "Map your strengths, skills, experience and relationships into a clear inventory of entrepreneurial capital.", "I don't know where to begin."],
  ["The 7 Day Opportunity Sprint", "A guided daily action plan that moves you from passive learning to your first real world experiment within a week.", "I keep planning but never act."],
  ["Customer Conversation Toolkit", "Interview scripts and worksheets to understand customers before you commit serious money.", "I don't know if people want this."],
  ["The Affordable Loss Planner", "Set clear limits on the money, time and reputation you'll commit to each experiment, so fear stops making decisions for you.", "I'm scared of financial risk."],
  ["The Purpose to Practice Canvas", "Align your entrepreneurial decisions with your values, responsibilities and long term purpose.", "I want my work to mean more than money."],
  ["Exclusive Alumni Roundtable", "Interactive sessions with selected GCE alumni entrepreneurs, what worked, what didn't, and why.", "I need perspectives from people who've done it."],
  ["Lifetime GCEian Community + Family Course", "Stay connected to the global alumni network, plus free access to the Family Course so the people closest to you share the mindset.", "I'll lose momentum after the course ends."],
];

export function Bonuses() {
  return (
    <section className="sec-ivory">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">The GCE Entrepreneurial Toolkit</span>
          <h2>
            Everything You Need to Turn Learning Into <span className="emerald-text">Meaningful Action.</span>
          </h2>
          <p className="lead">Knowing what to do is 1% of the battle. So every resource below exists to remove one specific reason people stall between &ldquo;I understand&rdquo; and &ldquo;I&apos;ve started&rdquo;.</p>
        </Reveal>
        <div className="stack">
          {bonuses.map(([t, b, s], i) => (
            <Reveal key={t} delay={0.04 * i} className="bonus">
              <div className="tag">BONUS<b>{String(i + 1).padStart(2, "0")}</b></div>
              <div><h3>{t}</h3><p>{b}</p><span className="solves">&ldquo;{s}&rdquo;</span></div>
              <div className="val">{IS_DEV && <><small>VALUE</small><Ph>approve</Ph></>}</div>
            </Reveal>
          ))}
        </div>
        <p className="center" style={{ marginTop: 20 }}><Ph>Proposed bonuses, publish only approved, deliverable resources; assign per pathway in content/site.ts</Ph></p>
        <div className="cta-row center" style={{ marginTop: 32 }}>
          <Button href="#pricing" size="lg" trackId="bonus_unlock">Unlock the Complete GCE Experience</Button>
        </div>
      </div>
    </section>
  );
}

/* 18, Pricing, pathways & risk reversal */
export function Pricing() {
  const t = site.offerTerms;
  const wa = site.contact.whatsapp;
  return (
    <section className="sec-white" id="pricing">
      <div className="container">
        <Reveal className="narrow center">
          <span className="eyebrow">Price positioning</span>
          <h2>
            Exceptional Entrepreneurial Education <span className="emerald-text">Shouldn&apos;t Cost a Fortune.</span>
          </h2>
          <p className="lead">
            An executive entrepreneurship program at a leading international business school can cost tens of thousands of dollars, plus travel, visas and weeks away from work.
            For most aspiring entrepreneurs, that door is simply closed.
          </p>
          <p className="lead">GCE opens a different one: internationally recognised entrepreneurial thinking, live online, from where you are.</p>
        </Reveal>
        <CostVisual />
        <Reveal className="value-compare">
          <table>
            <thead><tr><th scope="col">Traditional business school route</th><th scope="col">GCE learning pathway</th></tr></thead>
            <tbody>
              {[
                ["1 to 2+ years of academic commitment", "Focused 8 to 16 week pathways"],
                ["Broad general management curriculum", "Entrepreneurship focused, practical learning"],
                ["Formal degree qualification", "Certificate based program"],
                ["Significant tuition, travel & time off", "Accessible fees, learn from home"],
                ["Rarely addresses values & purpose", "Purpose driven E+ philosophy at the core"],
              ].map(([a, b]) => (
                <tr key={a}><td>{a}</td><td>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="narrow center" >
          <span className="eyebrow" style={{ marginTop: 80 }}>Choose your pathway</span>
          <h2>Choose the Learning Journey That Fits Your Goals.</h2>
        </Reveal>
        <div className="prices">
          {site.pathways.map((p, i) => (
            <Reveal key={p.id} delay={0.1 * i} className={`price${p.featured ? " featured" : ""}`}>
              {p.featured && <span className="ribbon">MOST CHOSEN</span>}
              <span className="tier">{p.name.toUpperCase()}</span>
              <p className="dur">{p.weeks} weeks</p>
              <div className="amt">
                {p.feePKR != null ? <>{formatPKR(p.feePKR)} <small>{p.taxNote}</small></> : IS_DEV ? <Ph>fee</Ph> : <span style={{ fontSize: "1.3rem" }}>Fee on request</span>}
              </div>
              <p className="for">{p.tagline}</p>
              <ul>
                {p.features.map((f, k) =>
                  f ? (
                    <li key={k}><Icon name="check" />{f}</li>
                  ) : (
                    IS_DEV && <li key={k}><Icon name="check" /><Ph>approved deliverable</Ph></li>
                  )
                )}
              </ul>
              <Button href={`/enroll?pathway=${p.id}`} trackId={`pricing_${p.id}`}>Enroll in {p.name}</Button>
            </Reveal>
          ))}
        </div>
        <Reveal className="help-card">
          <p><strong>Not sure which pathway fits?</strong> Our enrollment team will help you choose based on your goals, time and circumstances.</p>
          <div className="cta-row">
            <Button href="/consultation" variant="ghost" trackId="pricing_consultation">Book a Call</Button>
            <Button href={whatsappHref(wa, "Assalam o Alaikum, I'd like help choosing a GCE Batch 10 pathway.")} external variant="emerald" arrow={false} trackId="pricing_whatsapp">WhatsApp Us</Button>
          </div>
        </Reveal>

        <Reveal className="narrow center">
          <span className="eyebrow" style={{ marginTop: 90 }}>Risk reversal</span>
          <h2>
            Make an Informed Decision. <span className="emerald-text">Begin With Confidence.</span>
          </h2>
        </Reveal>
        <div className="risk">
          {(
            [
              ["eye", "Experience Before You Commit", <>Join the <Link href="/masterclass">free masterclass</Link> and see the teaching style first.</>],
              ["doc", "Transparent Program Information", "Curriculum, duration, fees and terms, all clear before you pay."],
              ["chat", "Personal Enrollment Guidance", "Talk to a real person before making your final decision."],
            ] as [IconName, string, React.ReactNode][]
          ).map(([ic, h, b], i) => (
            <Reveal key={h} delay={0.1 * i} className="risk-item">
              <div className="ico"><Icon name={ic} /></div>
              <h3>{h}</h3>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
        {(t.firstSessionPromise || IS_DEV) && (
          <Reveal className="seal">
            <div className="seal-badge"><span><b>1st</b>SESSION<br />PROMISE</span></div>
            <div>
              <h3 style={{ marginBottom: 8 }}>The First Session Promise <Ph>pending Sir&apos;s approval</Ph></h3>
              <p>
                Attend the first live session. If you genuinely feel GCE isn&apos;t the right fit, tell us before session two and you&apos;ll receive{" "}
                <Val v={t.firstSessionPromise} ph="approved remedy: full refund / transfer to a future cohort" />. We can offer this because, after nine batches, we know what
                happens in that first session.
              </p>
              {(t.installments || IS_DEV) && <p style={{ fontSize: ".88rem", color: "var(--muted)", marginTop: 10 }}>Installments: <Val v={t.installments} ph="approve" /> · Scholarships: <Val v={t.scholarships} ph="approve" /></p>}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* 19, FAQ */
export function Faq() {
  const t = site.offerTerms;
  const qa: [string, React.ReactNode][] = [
    ["Can I join if I've never started a business before?", "Yes. GCE is designed for different stages of experience. Aspiring entrepreneurs begin by understanding the resources and opportunities they already have, exactly the point of Effectuation."],
    ["Do I need significant capital to benefit?", "No. A core idea of the program is starting with available means and deciding what you can afford to lose, not waiting until you have large capital."],
    ["Is it suitable for existing business owners?", "Very much so. Many participants run businesses and use GCE to innovate, build stronger teams and make better strategic decisions."],
    ["Can I attend while working full time?", "Yes. Sessions run on Saturdays with a morning and an evening option, designed around working professionals."],
    ["I'm based in Saudi Arabia, UAE or another GCC country. Can I join?", <>Absolutely. GCE is fully live online, and participants have joined from {site.stats.countries} countries. <Ph>confirm time zones &amp; international payment methods</Ph></>],
    ["What's the difference between Discover, Develop and Transform?", "Duration (8, 12, 16 weeks), modules covered, bonuses and mentoring depth. If you're unsure, our enrollment team will help you choose."],
    ["Will I receive a certificate?", "Yes, on completing the requirements of your chosen pathway."],
    ["Will session recordings be available?", <Val key="r" v={t.recordings} ph="confirm recording policy" />],
    ["Are installment plans or scholarships available?", <>{t.installments || t.scholarships ? <>{t.installments} {t.scholarships}</> : "Speak with our enrollment team about your situation."} <Ph>confirm</Ph></>],
    ["What if I can't attend after enrolling?", <Val key="c" v={t.cancellation} ph="approved transfer / cancellation policy" />],
    ["Is GCE equivalent to an MBA?", "No, and we won't pretend it is. GCE is a focused, certificate based entrepreneurship program. Many participants find it more directly useful for starting and growing ventures, but it is not a degree."],
    ["Does this course guarantee business success or income?", "No honest program can. GCE gives you a way of thinking, practical frameworks and a community, what you build with them depends on your action."],
    ["How do I enroll?", "Choose a pathway above, complete the short form, then complete payment. You'll receive onboarding details by email and WhatsApp."],
  ];
  return (
    <section className="sec-ivory-2" id="faq">
      <div className="container narrow">
        <Reveal className="center">
          <span className="eyebrow">Questions, answered honestly</span>
          <h2>Frequently Asked Questions</h2>
        </Reveal>
        <div className="faq">
          {qa.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <div className="ans">{a}</div>
            </details>
          ))}
        </div>
        <div className="help-card" style={{ background: "#fff" }}>
          <p><strong>Still have questions?</strong> Our team will help you understand the program and enrollment options.</p>
          <Button href={whatsappHref(site.contact.whatsapp, "Assalam o Alaikum, I have a question about GCE Batch 10.")} external variant="emerald" arrow={false} trackId="faq_whatsapp">Talk to Our Team</Button>
        </div>
      </div>
    </section>
  );
}

/* 20, Final close */
export function FinalClose() {
  return (
    <section className="final grad-emerald on-dark">
      <div className="final-art" aria-hidden="true">
        <Image src="/img/site/dsq-stage.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="horizon" />
      <div className="container">
        <Reveal><span className="eyebrow">Your next chapter</span></Reveal>
        <Reveal delay={0.1}>
          <h2>
            The Resources You Have Today May Be the Beginning of <span className="gold-text">Something Greater.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead" style={{ maxWidth: 720, margin: "0 auto" }}>
            A year from now, you&apos;ll be one of two people. Same skills, same city, same income, still waiting for &ldquo;the right time&rdquo;. Or someone who learned to see
            differently, and started.
          </p>
        </Reveal>
        <div className="choice">
          <Reveal><b>Option one: keep waiting</b><p>More savings, more research, more videos. The questions stay the same. So does the life.</p></Reveal>
          <Reveal delay={0.1}><b>Option two: learn to think like an entrepreneur</b><p>Join a global cohort, learn directly from Dr. Shahid, and start building with what&apos;s already in your hand.</p></Reveal>
        </div>
        <div className="mantra in">
          <span>From Dependence to Independence.</span>
          <span>From Hopelessness to Hope.</span>
          <span>From Knowledge to Meaningful Action.</span>
          <span className="gold-text">Na umeedi se umeed ki taraf.</span>
        </div>
        <p style={{ maxWidth: 640, margin: "0 auto 36px" }}>You don&apos;t have to know everything before you begin. You just have to be willing to think differently. If you&apos;ve read this far, you already are.</p>
        <div className="cta-row center">
          <Button href="/enroll" size="lg" trackId="final_begin">Begin Your GCE Journey</Button>
          <Button href="/masterclass" variant="ghost" trackId="final_masterclass">Not Ready? Join the Free Masterclass</Button>
        </div>
        <p className="cta-note">Global Certificate in Entrepreneurship, Batch 10 · Live Online</p>
      </div>
    </section>
  );
}

/* Moments gallery, authentic classroom & event photography */
function Moments() {
  const items = [
    { src: photo("/img/moments/auditorium.webp", "/img/site/dsq-stage.webp")!, alt: "Dr. Shahid Qureshi teaching a full auditorium", cap: "In the classroom", big: true },
    { src: photo("/img/moments/sbkwu-group.webp", "/img/site/gce-batch.webp")!, alt: "Youth Leadership, Entrepreneurship & Social Enterprise Development Programme at SBKWU", cap: "Youth Leadership & Social Enterprise Programme · SBKWU" },
    { src: photo("/img/moments/uet-talk.webp", "/img/site/dsq-iba.webp")!, alt: "Dr. Shahid Qureshi speaking on entrepreneurship", cap: "Entrepreneurship talks across universities" },
    { src: "/img/usasbe-award-2.webp", alt: "USASBE award ceremony", cap: "USASBE · United States" },
    { src: "/img/ignite-pm.webp", alt: "IGNITE National Incubation Centres event", cap: "IGNITE · National Incubation Centres" },
  ];
  return (
    <div className="moments">
      {items.map((m, i) => (
        <Reveal key={m.cap} delay={0.06 * i} as="figure" className={`moment${m.big ? " big" : ""}`}>
          <Image src={m.src} alt={m.alt} fill sizes="(max-width:800px) 100vw, 600px" style={{ objectFit: "cover" }} />
          <figcaption>{m.cap}</figcaption>
        </Reveal>
      ))}
    </div>
  );
}
