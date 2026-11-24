"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LeadForm } from "./LeadForm";
import { track } from "@/lib/tracking";
import type { PathwayId } from "@/content/site";

/**
 * 1) Enrollment application popup: every link to /enroll opens this modal instead of a new page
 *    (the link stays as a no-JS fallback). The pathway in the link is preselected.
 * 2) Interest popup: appears once per session after a short delay, with Dr. Shahid's photo.
 */
export function Popups() {
  const [enroll, setEnroll] = useState<null | PathwayId | "guidance">(null);
  const [interest, setInterest] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='/enroll']") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const p = new URL(a.href).searchParams.get("pathway") as PathwayId | null;
      setInterest(false);
      setEnroll(p || "develop");
      track("enroll_popup_open", { pathway: p || "none" });
    };
    document.addEventListener("click", onClick);

    let shown = false;
    try {
      shown = sessionStorage.getItem("gce_interest_seen") === "1";
    } catch {}
    const t = shown
      ? undefined
      : setTimeout(() => {
          setEnroll((cur) => {
            if (!cur) setInterest(true);
            return cur;
          });
          try {
            sessionStorage.setItem("gce_interest_seen", "1");
          } catch {}
        }, 7000);
    return () => {
      document.removeEventListener("click", onClick);
      if (t) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setEnroll(null), setInterest(false));
    document.addEventListener("keydown", esc);
    document.body.style.overflow = enroll ? "hidden" : "";
    return () => document.removeEventListener("keydown", esc);
  }, [enroll]);

  return (
    <AnimatePresence>
      {enroll && (
        <motion.div key="enroll" className="pop-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && setEnroll(null)}>
          <motion.div className="pop pop-enroll" role="dialog" aria-modal="true" aria-label="GCE Batch 10 application" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }}>
            <button className="pop-x" onClick={() => setEnroll(null)} aria-label="Close">×</button>
            <div className="pop-side">
              <Image src="/img/sir/pointing-crop.webp" alt="Dr. Shahid Qureshi" fill sizes="320px" style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
              <div className="pop-side-cap">
                <b>GCE Batch 10</b>
                <span>Starts Saturday, 9 January 2027</span>
              </div>
            </div>
            <div className="pop-body">
              <span className="eyebrow">Your application</span>
              <h3>Begin Your GCE Journey</h3>
              <p className="pop-sub">Takes less than a minute. Our team confirms your seat on WhatsApp.</p>
              <LeadForm kind="enroll" submitLabel="Submit Application" defaultPathway={enroll} />
            </div>
          </motion.div>
        </motion.div>
      )}
      {interest && !enroll && (
        <motion.div key="interest" className="pop-interest" role="dialog" aria-label="Register your interest" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}>
          <button className="pop-x" onClick={() => setInterest(false)} aria-label="Close">×</button>
          <div className="pi-photo">
            <Image src="/img/sir/pointing-crop.webp" alt="Dr. Shahid Qureshi" fill sizes="140px" style={{ objectFit: "cover", objectPosition: "50% 10%" }} />
          </div>
          <div className="pi-body">
            <b>Interested in GCE Batch 10?</b>
            <p>Register your interest and Dr. Shahid&apos;s team will share the details with you.</p>
            <a href="/enroll" className="btn btn-primary" data-cta="interest_popup">Register My Interest</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
