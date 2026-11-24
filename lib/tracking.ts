"use client";
/**
 * Client-side, consent-aware event tracking.
 * Pushes to GTM dataLayer (GA4 configured inside GTM or via gtag) and Meta Pixel.
 * Every event carries an event_id so the server-side Conversions API can deduplicate.
 * NOTE: "Purchase" is never fired from the browser — only from the verified payment webhook.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "gce_consent";

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function setConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {}
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
  window.fbq?.("consent", granted ? "grant" : "revoke");
}

export function newEventId(prefix = "ev") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const META_MAP: Record<string, string> = {
  generate_lead: "Lead",
  begin_checkout: "InitiateCheckout",
  masterclass_register: "CompleteRegistration",
  consultation_request: "Contact",
  view_pricing: "ViewContent",
};

export function track(event: string, params: Params = {}, eventId = newEventId()) {
  if (typeof window === "undefined") return eventId;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, event_id: eventId, ...params });
  if (hasConsent() && window.fbq) {
    const meta = META_MAP[event];
    if (meta) window.fbq("track", meta, params, { eventID: eventId });
    else window.fbq("trackCustom", event, params, { eventID: eventId });
  }
  return eventId;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

/** Persist first-touch attribution for the session. */
export function captureAttribution() {
  try {
    const qs = new URLSearchParams(location.search);
    const found: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = qs.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length && !sessionStorage.getItem("gce_attr")) {
      sessionStorage.setItem("gce_attr", JSON.stringify({ ...found, landing: location.pathname, ts: Date.now() }));
    }
  } catch {}
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("gce_attr") || "{}");
  } catch {
    return {};
  }
}
