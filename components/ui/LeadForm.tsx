"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { countries, professionalBackgrounds, site, formatPKR, type PathwayId } from "@/content/site";
import { getAttribution, hasConsent, newEventId, track } from "@/lib/tracking";
import { Icon } from "./Icon";

type Kind = "enroll" | "masterclass" | "consultation" | "resource";

const ENDPOINT: Record<Kind, string> = {
  enroll: "/api/lead",
  masterclass: "/api/masterclass",
  consultation: "/api/consultation",
  resource: "/api/resource",
};
const EVENT: Record<Kind, string> = {
  enroll: "generate_lead",
  masterclass: "masterclass_register",
  consultation: "consultation_request",
  resource: "resource_download",
};

export function LeadForm({
  kind,
  submitLabel,
  defaultPathway,
  resource,
}: {
  kind: Kind;
  submitLabel: string;
  defaultPathway?: PathwayId | "guidance";
  resource?: string;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.acceptTerms = fd.get("acceptTerms") === "on";
    payload.marketingConsent = fd.get("marketingConsent") === "on";
    payload.attribution = getAttribution();
    payload.analyticsConsent = hasConsent();
    if (resource) payload.resource = resource;
    const eventId = newEventId(kind);
    payload.eventId = eventId;
    try {
      const res = await fetch(ENDPOINT[kind], { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors || {});
        setMsg(json.error || "Please check the highlighted fields.");
        setBusy(false);
        return;
      }
      track(EVENT[kind], { pathway: String(payload.pathway || ""), country: String(payload.country || ""), resource: resource || "" }, eventId);
      router.push(json.next);
    } catch {
      setMsg("Something went wrong. Please try again or contact us on WhatsApp.");
      setBusy(false);
    }
  }

  const err = (k: string) => (errors[k] ? <span className="err">{errors[k]}</span> : null);
  const f = (k: string) => `field${errors[k] ? " has-err" : ""}`;

  return (
    <form onSubmit={onSubmit} noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
      <div className={f("fullName")}>
        <label htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" autoComplete="name" required placeholder="Your full name" />
        {err("fullName")}
      </div>
      <div className="row-2">
        <div className={f("email")}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          {err("email")}
        </div>
        <div className={f("whatsapp")}>
          <label htmlFor="whatsapp">WhatsApp number</label>
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" required placeholder="+92 300 0000000" />
          {err("whatsapp")}
        </div>
      </div>
      <div className={f("country")}>
        <label htmlFor="country">Country of residence</label>
        <select id="country" name="country" required defaultValue="">
          <option value="" disabled>Select country</option>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {err("country")}
      </div>

      {kind === "enroll" && (
        <>
          <div className={f("background")}>
            <label htmlFor="background">Professional background</label>
            <select id="background" name="background" required defaultValue="">
              <option value="" disabled>Select your background</option>
              {professionalBackgrounds.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {err("background")}
          </div>
          <fieldset className={f("pathway")} style={{ border: 0 }}>
            <legend style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: 8 }}>Preferred learning pathway</legend>
            <div className="opt-group">
              {site.pathways.map((p) => (
                <label key={p.id} className="opt">
                  <input type="radio" name="pathway" value={p.id} defaultChecked={defaultPathway === p.id} />
                  <b>{p.name}</b> — {p.weeks} weeks
                  <span>{p.feePKR != null ? `${formatPKR(p.feePKR)} ${p.taxNote}` : "Fee on request"}</span>
                </label>
              ))}
              <label className="opt">
                <input type="radio" name="pathway" value="guidance" defaultChecked={defaultPathway === "guidance"} />
                <b>I need guidance choosing a pathway</b>
              </label>
            </div>
            {err("pathway")}
          </fieldset>
          <div className={f("timing")}>
            <label htmlFor="timing">Preferred batch timing</label>
            <select id="timing" name="timing" required defaultValue="">
              <option value="" disabled>Select preferred timing</option>
              <option value="morning">Saturday morning · {site.logistics.morning}</option>
              <option value="evening">Saturday evening · {site.logistics.evening}</option>
              <option value="either">Either works</option>
            </select>
            {err("timing")}
          </div>
        </>
      )}

      {kind === "consultation" && (
        <>
          <div className="field">
            <label htmlFor="preferredTime">Best time to call</label>
            <select id="preferredTime" name="preferredTime" defaultValue="any">
              <option value="any">Any time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="question">What would you like to discuss? (optional)</label>
            <input id="question" name="question" placeholder="e.g. Which pathway suits a business owner in Riyadh?" />
          </div>
        </>
      )}

      {kind === "enroll" && (
        <label className="check">
          <input type="checkbox" name="acceptTerms" />
          <span>
            I agree to the <a href="/terms" target="_blank">enrollment terms</a> and <a href="/privacy-policy" target="_blank">privacy policy</a>.
          </span>
        </label>
      )}
      {err("acceptTerms")}
      <label className="check">
        <input type="checkbox" name="marketingConsent" defaultChecked={kind !== "enroll"} />
        <span>Send me course updates and educational resources by email and WhatsApp. Unsubscribe anytime.</span>
      </label>

      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={busy} style={{ marginTop: 18 }}>
        {busy ? "Please wait…" : submitLabel} {!busy && <Icon name="arrow" />}
      </button>
      <div className={`form-msg${msg ? " show" : ""}`} role="alert">{msg}</div>
    </form>
  );
}
