# GCE Batch 10 — Premium VSL Sales Funnel

Dr. Shahid Qureshi School of Entrepreneurship · Global Certificate in Entrepreneurship, Batch 10.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion

```bash
npm install
cp .env.example .env.local   # fill in GTM / Pixel / CRM / payment keys
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Where to edit content

| What | File |
| --- | --- |
| Dates, fees, stats, logistics, videos, offer terms, contact | `content/site.ts` |
| Thought-leader endorsements (verbatim), logos, media, creatives | `content/endorsements.ts` |
| Section copy | `components/sections/Top.tsx`, `Bottom.tsx`, `Authority.tsx` |
| Brand design system (colours, buttons, gradients) | `app/brand.css` |

Any value set to `null` in `content/site.ts` is **unconfirmed**. It shows as a yellow
dashed tag in `npm run dev` and is **hidden in production builds**, so placeholder content
never goes live as evidence.

Optional photos: drop files into `public/img/moments/` (see the README there) and they
appear on the next build.

## Pages

`/` sales page (20 sections + podcasts + endorsements) · `/enroll` · `/checkout` ·
`/checkout/pending` · `/welcome` (verified payment only) · `/masterclass` ·
`/masterclass/confirmed` · `/replay` · `/consultation` · `/resources` ·
`/privacy-policy` · `/terms` · `/refund-policy`

See `docs/FUNNEL.md` for tracking, CRM automation and the payment flow.
