import { Nav, StickyCta } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Announcement, Credibility, Effectuation, EPlus, Hero, Mentor, Mindset, Podcasts, Problem, ProductReveal, Roadblock } from "@/components/sections/Top";
import { Endorsements, Journey, LogoStrip } from "@/components/sections/Authority";
import { Popups } from "@/components/ui/Popups";
import { Bonuses, Community, CurriculumSection, Experience, Faq, FinalClose, Pricing, Recognition, Stories, WhoFor } from "@/components/sections/Bottom";

/** GCE Batch 10, main long-form VSL sales page (20 sections + podcast block). */
export default function Page() {
  return (
    <>
      <Announcement />
      <Nav />
      <main id="top">
        <Hero />
        <Credibility />
        <LogoStrip />
        <Problem />
        <Roadblock />
        <Mindset />
        <Effectuation />
        <EPlus />
        <ProductReveal />
        <Mentor />
        <Podcasts />
        <Recognition />
        <Journey />
        <Endorsements />
        <Community />
        <Stories />
        <WhoFor />
        <CurriculumSection />
        <Experience />
        <Bonuses />
        <Pricing />
        <Faq />
        <FinalClose />
      </main>
      <Footer />
      <StickyCta />
      <Popups />
    </>
  );
}
