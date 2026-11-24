# Funnel architecture

```
Meta Ads / Alumni / Organic
        │
        ▼
  /  (VSL sales page) ──► #pricing ──► /enroll?pathway=… ──► /checkout ──► gateway ──► /welcome
        │                                   │ "need guidance"        │ bank transfer
        │                                   ▼                        ▼
        ├──► /masterclass ──► /masterclass/confirmed ──► /replay   /checkout/pending
        ├──► /consultation
        └──► /resources (lead magnets)
```

## Tracking (consent-aware)

* GTM + GA4 with Consent Mode v2 (default **denied**), Meta Pixel loads only after consent.
* Browser events pushed to `dataLayer`: `cta_click`, `video_start`, `video_progress` (25/50/75/95),
  `view_pricing`, `generate_lead`, `view_checkout`, `begin_checkout`, `masterclass_register`,
  `consultation_request`, `resource_download`.
* Each event has an `event_id`; the same id is sent to Meta **Conversions API** from the server
  for deduplication.
* **Purchase is never fired from the browser.** It is sent only from
  `POST /api/payment/webhook` after the gateway signature is verified.

## CRM automation map

Every API route posts a signed JSON event to `CRM_WEBHOOK_URL` (GoHighLevel, HubSpot, Make, n8n…).

| Event | Pipeline stage | Automation to start |
| --- | --- | --- |
| `resource.downloaded` | New Inquiry | Welcome + educational nurture |
| `masterclass.registered` | Masterclass Registered | Confirmation + reminders (24h, 1h, live) |
| `masterclass.attended` / `.missed` | Attended / — | Replay + enrollment invitation |
| `enrollment.form_submitted` | Payment Pending | Enrollment guidance |
| `consultation.requested` | Consultation Requested | Notify enrollment team |
| `checkout.started` → no payment | Payment Pending | Incomplete-checkout follow-up (consent) |
| `payment.verified` | Paid / Enrolled | Receipt + onboarding + community invite |

Attribution (UTMs, fbclid, gclid, landing page) is captured on first visit and sent with every lead.

## Payments

* Prices are recomputed on the server from `content/site.ts`; the browser never sends an amount.
* Orders are HMAC-signed tokens (`lib/server.ts`) — swap for a database table when the gateway is chosen.
* `verifyPayment()` returns `false` until a gateway is configured, so nobody is marked enrolled by
  opening a success URL.

## Before launch checklist

- [ ] Approve Discover / Transform fees, GST rate, installment & refund terms (`content/site.ts`)
- [ ] Final VSL YouTube ID, student video testimonials, written reviews with permission
- [ ] Payment gateway + webhook secret, CRM webhook, GTM / GA4 / Pixel / CAPI token
- [ ] Legal review of privacy, terms and refund pages
- [ ] High-res originals for USASBE / IGNITE photos (`public/img/*.webp`)
