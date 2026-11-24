"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { captureAttribution, setConsent, track } from "@/lib/tracking";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * GTM + GA4 (Consent Mode v2, default denied) + Meta Pixel (loaded only after consent).
 * Also: UTM capture, global CTA click tracking ([data-cta]) and pricing-view tracking.
 */
export function Analytics() {
  const [consent, setC] = useState<"unknown" | "granted" | "denied">("unknown");

  useEffect(() => {
    captureAttribution();
    try {
      const v = localStorage.getItem("gce_consent");
      if (v === "granted" || v === "denied") setC(v);
    } catch {}

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cta]") as HTMLElement | null;
      if (el) track("cta_click", { cta_id: el.dataset.cta || "unknown", cta_text: el.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick);

    const pricing = document.getElementById("pricing");
    let io: IntersectionObserver | undefined;
    if (pricing) {
      io = new IntersectionObserver(
        (ents) => ents.forEach((en) => en.isIntersecting && (track("view_pricing", { content_name: "GCE Batch 10" }), io?.disconnect())),
        { threshold: 0.2 }
      );
      io.observe(pricing);
    }
    return () => {
      document.removeEventListener("click", onClick);
      io?.disconnect();
    };
  }, []);

  const choose = (g: boolean) => {
    setConsent(g);
    setC(g ? "granted" : "denied");
  };

  const pixelAllowed = PIXEL && consent === "granted";

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">{`
        window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;
        var g=false;try{g=localStorage.getItem('gce_consent')==='granted'}catch(e){}
        gtag('consent','default',{analytics_storage:g?'granted':'denied',ad_storage:g?'granted':'denied',ad_user_data:g?'granted':'denied',ad_personalization:g?'granted':'denied',wait_for_update:500});
      `}</Script>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');
        `}</Script>
      )}
      {GA4 && !GTM && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`gtag('js',new Date());gtag('config','${GA4}');`}</Script>
        </>
      )}
      {pixelAllowed && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL}');fbq('track','PageView');
        `}</Script>
      )}
      {consent === "unknown" && (
        <div className="consent" role="dialog" aria-label="Cookie consent">
          <p>
            We use cookies to measure campaign performance and improve your experience. See our <a href="/privacy-policy">Privacy Policy</a>.
          </p>
          <div className="consent-actions">
            <button className="btn btn-ghost" onClick={() => choose(false)}>Essential only</button>
            <button className="btn btn-primary" onClick={() => choose(true)}>Accept</button>
          </div>
        </div>
      )}
    </>
  );
}
