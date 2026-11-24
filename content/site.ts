/**
 * GCE Batch 10 — single source of editable funnel content.
 *
 * CMS-ready: every value here can be moved to a headless CMS (Sanity, Contentful, Strapi…)
 * without touching components. Any value set to `null` is UNCONFIRMED: it renders as a
 * visible yellow placeholder in development and is hidden in production builds, so
 * placeholder content can never go live as genuine evidence.
 */

export type PathwayId = "discover" | "develop" | "transform";

export interface Pathway {
  id: PathwayId;
  name: string;
  weeks: number;
  tagline: string;
  /** Fee in PKR excluding tax. null = not yet approved. */
  feePKR: number | null;
  taxNote: string;
  featured?: boolean;
  features: (string | null)[];
}

export interface Testimonial {
  name: string | null;
  role: string | null;
  country: string | null;
  quote: string | null;
  photo?: string;
}

export interface VideoItem {
  youtubeId: string;
  title: string;
  label: string;
}

export const site = {
  brand: {
    school: "Dr. Shahid Qureshi",
    tagline: "Promoting Purpose Driven Entrepreneurship",
    program: "Global Certificate in Entrepreneurship",
    batch: "Batch 10",
  },

  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923232924611",
    phoneDisplay: "+92 323 2924611",
    email: "info@drshahidqureshi.com" as string | null,
    city: "Karachi, Pakistan",
  },

  /** Only set a deadline once it is confirmed — urgency copy appears only when this is set. */
  enrollment: {
    open: true,
    commencementDate: "Saturday, 9 January 2027" as string | null, // from the official Batch 10 banner
    registrationDeadline: null as string | null, // ISO date, e.g. "2027-01-06"
    seats: null as number | null,
  },

  logistics: {
    format: "Live Online",
    schedule: "Every Saturday",
    morning: "9:00 – 11:00 AM",
    evening: "7:00 – 9:00 PM",
    timeZone: null as string | null, // e.g. "PKT (GMT+5)"
    language: null as string | null,
  },

  stats: {
    participants: 1000,
    batches: 9,
    countries: 28,
    cities: 57,
    yearsTeaching: 20,
    trained: 10000,
    internationalVisitors: 200,
  },

  videos: {
    vsl: { youtubeId: "9tqbIQwOtCw", title: "Discover the Entrepreneurial Mindset", label: "Dr. Shahid's personal introduction to GCE" } as VideoItem,
    podcasts: [
      { youtubeId: "QOBrZEC6meI", title: "Why Mindset — Not Money — Is the Real Starting Capital", label: "Podcast · Dr. Shahid Qureshi" },
      { youtubeId: "vU6QQ97yPFg", title: "People Are the Purpose. Business Is the Tool.", label: "Podcast · Dr. Shahid Qureshi" },
    ] as VideoItem[],
    /** Student video testimonials — add YouTube IDs once approved. */
    testimonials: [] as (VideoItem & { role: string })[],
  },

  pathways: [
    {
      id: "discover",
      name: "Discover",
      weeks: 8,
      tagline: "Build the entrepreneurial mindset and core frameworks.",
      feePKR: null,
      taxNote: "+ GST",
      features: ["Live Saturday sessions with Dr. Shahid", "Entrepreneurial Mindset & Effectuation", "Bonuses 01 & 02", "GCE Certificate"],
    },
    {
      id: "develop",
      name: "Develop",
      weeks: 12,
      tagline: "Develop practical entrepreneurial capabilities you can apply immediately.",
      feePKR: 70000,
      taxNote: "+ GST",
      featured: true,
      features: ["Everything in Discover", "AI in Business · Marketing Analytics", "Money Management · Design Thinking", "Operations Management", "Group coaching to refine your business idea", "Bonuses 01–06 incl. Alumni Roundtable"],
    },
    {
      id: "transform",
      name: "Transform",
      weeks: 16,
      tagline: "The full six-module transformation with deeper mentorship.",
      feePKR: null,
      taxNote: "+ GST",
      features: ["Everything in Develop", "Scaling Up, Strategy & Values modules", "All 7 bonuses incl. lifetime community", null],
    },
  ] as Pathway[],

  /** Approved financing / risk-reversal options. Leave false until Sir approves. */
  offerTerms: {
    firstSessionPromise: null as string | null, // e.g. "a full refund" or "a free transfer to the next cohort"
    installments: null as string | null,
    scholarships: null as string | null,
    recordings: null as string | null,
    cancellation: null as string | null,
  },

  featuredAlumni: {
    name: "Saad Afridi",
    role: "Founder & CEO — Scents N Stories",
    quote: null as string | null,
    youtubeId: null as string | null,
  },

  testimonials: [
    { name: null, role: null, country: null, quote: null },
    { name: null, role: null, country: null, quote: null },
    { name: null, role: null, country: null, quote: null },
  ] as Testimonial[],

  caseStudies: [
    { before: null, learning: null, implementation: null, outcome: null },
  ] as { before: string | null; learning: string | null; implementation: string | null; outcome: string | null }[],

  mentor: {
    bio: null as string | null,
    credentials: [
      "PhD in Entrepreneurship — TU Berlin, Germany",
      "Rector, GIFT University, Gujranwala",
      "Professor & Director, IBA Centre for Entrepreneurial Development (2010–2022)",
      "Led Global Entrepreneurship Monitor (GEM) research in Pakistan",
      "Babson Fellow in Entrepreneurship",
      "USASBE Outstanding Program Awards — 2017 & 2021",
      "20+ years teaching & mentoring worldwide",
      "10,000+ entrepreneurs & managers trained",
      "Taught at TU Berlin, Frankfurt School, Toulouse BS, SP Jain Dubai, Kempten",
    ],
  },

  countries: [
    "USA", "Canada", "UK", "Germany", "Netherlands", "Portugal", "Saudi Arabia", "UAE", "Qatar", "Kenya",
    "Nigeria", "Ghana", "Somalia", "Kazakhstan", "Azerbaijan", "Afghanistan", "India", "Bangladesh",
    "Malaysia", "Thailand", "Indonesia", "Australia", "New Zealand", "Cuba", "Pakistan",
  ],

  masterclass: {
    title: "How to Start Thinking Like an Entrepreneur — Even When Resources Are Limited.",
    date: null as string | null,
    time: null as string | null,
    format: "Live online · Free",
    replayYoutubeId: "9tqbIQwOtCw",
  },
};

export const professionalBackgrounds = [
  "Corporate professional",
  "Aspiring entrepreneur",
  "Existing business owner",
  "Family business successor",
  "Freelancer / consultant",
  "Student / recent graduate",
  "Educator / trainer",
  "Other",
];

export const countries = [
  "Pakistan", "Saudi Arabia", "United Arab Emirates", "Qatar", "Oman", "Kuwait", "Bahrain",
  "United Kingdom", "United States", "Canada", "Germany", "Australia", "Malaysia", "Other",
];

export function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-US");
}

export const GST_RATE = 0; // Set once confirmed (e.g. 0.16). Server recomputes totals; never trust the client.
