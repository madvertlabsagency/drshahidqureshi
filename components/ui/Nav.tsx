"use client";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const links = [
  ["#about", "About GCE"],
  ["#mentor", "Your Mentor"],
  ["#stories", "Student Stories"],
  ["#curriculum", "Curriculum"],
  ["#pricing", "Pricing"],
];

export function Nav({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Logo href={minimal ? "/" : "#top"} />
        {!minimal && (
          <>
            <ul className="nav-links">
              {links.map(([h, l]) => (
                <li key={h}>
                  <a href={h}>{l}</a>
                </li>
              ))}
            </ul>
            <a href="#pricing" className="btn btn-primary" data-cta="header_get_enrolled">
              Get Enrolled <Icon name="arrow" />
            </a>
          </>
        )}
        {minimal && (
          <span className="secure-note">
            <Icon name="lock" /> Secure enrollment
          </span>
        )}
      </div>
    </header>
  );
}

export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const hero = document.querySelector(".hero") as HTMLElement | null;
      const pricing = document.getElementById("pricing");
      const past = hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 120 : window.scrollY > 600;
      let atPricing = false;
      if (pricing) {
        const r = pricing.getBoundingClientRect();
        atPricing = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      }
      setShow(past && !atPricing);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`sticky-cta${show ? " show" : ""}`} aria-hidden={!show}>
      <div>
        <b>GCE Batch 10</b>
        <small>Explore pathways</small>
      </div>
      <a href="#pricing" className="btn btn-primary" data-cta="mobile_sticky" tabIndex={show ? 0 : -1}>
        Get Enrolled
      </a>
    </div>
  );
}
