import type {
  FaqItem,
  FaqPageKey,
  MusicItem,
  PostItem,
  ShowItem,
  SignUpPlan,
} from "./types";

export const DEFAULT_FAQS: Record<FaqPageKey, FaqItem[]> = {
  shows: [
    {
      _id: "faq-shows-1",
      page: "shows",
      order: 1,
      question: "How soon can you start?",
      answer: "Most projects start three to five weeks after the first call.",
    },
    {
      _id: "faq-shows-2",
      page: "shows",
      order: 2,
      question: "Do you work with small teams?",
      answer: "Yes. Half our collaborators work in small, independent teams.",
    },
    {
      _id: "faq-shows-3",
      page: "shows",
      order: 3,
      question: "What does a project cost?",
      answer:
        "Brand from €12k, UI/UX from €16k, Framer sites from €8k. Sign Up has the detail.",
    },
    {
      _id: "faq-shows-4",
      page: "shows",
      order: 4,
      question: "Will we be able to edit the site?",
      answer:
        "Yes. Every Framer site comes with a recorded handover and a one-page guide.",
    },
    {
      _id: "faq-shows-5",
      page: "shows",
      order: 5,
      question: "Do you work remotely?",
      answer:
        "Yes. We collaborate remotely with partners and teams in 14 countries.",
    },
    {
      _id: "faq-shows-6",
      page: "shows",
      order: 6,
      question: "What do you need from us to begin?",
      answer:
        "A short brief, one decision-maker, and an hour for the first workshop.",
    },
  ],
  "sign-up": [
    {
      _id: "faq-signup-1",
      page: "sign-up",
      order: 1,
      question: "How soon can you start?",
      answer: "Most projects start three to five weeks after the first call.",
    },
    {
      _id: "faq-signup-2",
      page: "sign-up",
      order: 2,
      question: "Do you work with small teams?",
      answer: "Yes. Half our collaborators work in small, independent teams.",
    },
    {
      _id: "faq-signup-3",
      page: "sign-up",
      order: 3,
      question: "What does a project cost?",
      answer:
        "Brand from €12k, UI/UX from €16k, Framer sites from €8k. Sign Up has the detail.",
    },
    {
      _id: "faq-signup-4",
      page: "sign-up",
      order: 4,
      question: "Will we be able to edit the site?",
      answer:
        "Yes. Every Framer site comes with a recorded handover and a one-page guide.",
    },
    {
      _id: "faq-signup-5",
      page: "sign-up",
      order: 5,
      question: "Do you work remotely?",
      answer:
        "Yes. We collaborate remotely with partners and teams in 14 countries.",
    },
    {
      _id: "faq-signup-6",
      page: "sign-up",
      order: 6,
      question: "What do you need from us to begin?",
      answer:
        "A short brief, one decision-maker, and an hour for the first workshop.",
    },
  ],
  contact: [
    {
      _id: "faq-contact-1",
      page: "contact",
      order: 1,
      question: "Where do I send a booking enquiry?",
      answer:
        "Send the date, venue, promoter and fee to bookings@vimatalent.com. With those four we can usually confirm availability in one reply.",
    },
    {
      _id: "faq-contact-2",
      page: "contact",
      order: 2,
      question: "Who handles management and press?",
      answer:
        "For long-term work, press and partnerships, write to team@vsimanagement.com. Enquiries are answered within two working days.",
    },
    {
      _id: "faq-contact-3",
      page: "contact",
      order: 3,
      question: "Do you take on new projects?",
      answer:
        "Yes. The studio takes a small number of projects each quarter, and most start three to five weeks after the first call.",
    },
    {
      _id: "faq-contact-4",
      page: "contact",
      order: 4,
      question: "Can I license an image or a film?",
      answer:
        "Ask before you publish. Send the intended use, territories and campaign window, and we will come back with a licence and the right files.",
    },
    {
      _id: "faq-contact-5",
      page: "contact",
      order: 5,
      question: "How quickly will I hear back?",
      answer:
        "Within two working days for general enquiries, and the same day for anything about a show happening that week.",
    },
  ],
};

export const DEFAULT_POSTS: PostItem[] = [
  {
    _id: "post-golden-hour",
    slug: "why-we-shoot-at-golden-hour",
    title: "Why we shoot at golden hour",
    category: "Craft",
    readTime: "5 min",
    order: 1,
    coverImage: "/assets/w2UlbKx2Vdo5e7BnZeNPIe1yo.webp",
    excerpt:
      "Twenty minutes of light do more for a brand than a day in a studio.",
    body: [
      {
        _type: "block",
        _key: "gh-h1",
        style: "h3",
        children: [{ _type: "span", _key: "gh-h1-s", text: "The short answer" }],
      },
      {
        _type: "block",
        _key: "gh-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "gh-p1-s",
            text: "Low sun is kind. It softens skin, warms colour and gives every surface an edge.",
          },
        ],
      },
      {
        _type: "block",
        _key: "gh-h2",
        style: "h3",
        children: [{ _type: "span", _key: "gh-h2-s", text: "How we plan it" }],
      },
      {
        _type: "block",
        _key: "gh-p2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "gh-p2-s",
            text: "We book locations by sunset time, scout the day before, and keep crews small enough to move fast.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-design-system",
    slug: "a-design-system-in-one-evening",
    title: "A design system in one evening",
    category: "Process",
    readTime: "4 min",
    order: 2,
    coverImage: "/assets/Eb1uFBWT6v6lD14cKqee1Rr2Iw4.webp",
    excerpt:
      "Why tightening typography, tokens, and surface elevation first saves weeks down the road.",
    body: [
      {
        _type: "block",
        _key: "ds-h1",
        style: "h3",
        children: [{ _type: "span", _key: "ds-h1-s", text: "Start with tokens" }],
      },
      {
        _type: "block",
        _key: "ds-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ds-p1-s",
            text: "Most teams over-design components before they agree on type scales, surface contrast, and spacing rhythm. Lock those three first and every page falls into place.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-grading-site",
    slug: "grading-a-whole-site-to-one-hour",
    title: "Grading a whole site to one hour",
    category: "Craft",
    readTime: "6 min",
    order: 3,
    coverImage: "/assets/urb7pwcsBQOWCSywBmbtIytIg.webp",
    excerpt:
      "Tuning colour temperature, shadow density, and highlight glow across every scroll stop.",
    body: [
      {
        _type: "block",
        _key: "gr-h1",
        style: "h3",
        children: [{ _type: "span", _key: "gr-h1-s", text: "One palette, start to finish" }],
      },
      {
        _type: "block",
        _key: "gr-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "gr-p1-s",
            text: "Treating a website like film grading keeps photography, headings, and interactive highlights in the exact same room.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-handover",
    slug: "what-a-framer-handover-looks-like",
    title: "What a Framer handover looks like",
    category: "Framer",
    readTime: "4 min",
    order: 4,
    coverImage: "/assets/ocAm6qW5p5Zumd8tOOxG8CwzdZw.webp",
    excerpt:
      "Clean component props, documented CMS collections, and a walkthrough your team can revisit anytime.",
    body: [
      {
        _type: "block",
        _key: "fh-h1",
        style: "h3",
        children: [{ _type: "span", _key: "fh-h1-s", text: "Built to be edited" }],
      },
      {
        _type: "block",
        _key: "fh-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "fh-p1-s",
            text: "Every release ships with structured collections, clear naming conventions, and a concise video walkthrough so nothing depends on guesswork.",
          },
        ],
      },
    ],
  },
];

export const DEFAULT_SHOW_ITEMS: ShowItem[] = [
  {
    _id: "show-brand-identity",
    slug: "brand-identity",
    orderLabel: "01",
    phase: "Prelude",
    title: "Brand identity",
    summary: "Identities with warmth, built to outlast the launch.",
    priceLabel: "From €12,000",
    ctaLabel: "Details →",
    coverImage: "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
    order: 1,
    body: [
      {
        _type: "block",
        _key: "sb-h1",
        style: "h3",
        children: [{ _type: "span", _key: "sb-h1-s", text: "Scope & deliverables" }],
      },
      {
        _type: "block",
        _key: "sb-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "sb-p1-s",
            text: "Strategy, visual direction, typography system, colour palette, and concise brand guidelines built to move effortlessly across digital and stage.",
          },
        ],
      },
    ],
  },
  {
    _id: "show-ui-ux-design",
    slug: "ui-ux-design",
    orderLabel: "19:58",
    phase: "Blue hour",
    title: "UI/UX design",
    summary: "Product and UI/UX that stays calm under pressure.",
    priceLabel: "From €16,000",
    ctaLabel: "Details →",
    coverImage: "/assets/tiYSqeC6a3AAT9qZoZIzZYdno1k.webp",
    order: 2,
    body: [
      {
        _type: "block",
        _key: "su-h1",
        style: "h3",
        children: [{ _type: "span", _key: "su-h1-s", text: "Scope & deliverables" }],
      },
      {
        _type: "block",
        _key: "su-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "su-p1-s",
            text: "Product architecture, responsive UI systems, interactive prototypes, and component specs ready for engineering handover.",
          },
        ],
      },
    ],
  },
  {
    _id: "show-framer-sites",
    slug: "framer-sites",
    orderLabel: "20:41",
    phase: "Afterglow",
    title: "Framer sites",
    summary: "Fast, editable Framer sites your own team can run.",
    priceLabel: "From €8,000",
    ctaLabel: "Details →",
    coverImage: "/assets/qqfZIrcNBNrGIt8lRD3pohMwqS0.webp",
    order: 3,
    body: [
      {
        _type: "block",
        _key: "sf-h1",
        style: "h3",
        children: [{ _type: "span", _key: "sf-h1-s", text: "Scope & deliverables" }],
      },
      {
        _type: "block",
        _key: "sf-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "sf-p1-s",
            text: "Custom art-directed layouts, smooth scroll choreography, CMS integration, SEO fundamentals, and recorded handover.",
          },
        ],
      },
    ],
  },
  {
    _id: "show-motion-and-content",
    slug: "motion-and-content",
    orderLabel: "20:58",
    phase: "Last light",
    title: "Motion & content",
    summary: "Motion, film and stills that move the brand.",
    priceLabel: "From €6,000",
    ctaLabel: "Details →",
    coverImage: "/assets/NITgIgJ8ZM7cZzQ9k8k8NoCMGc.webp",
    order: 4,
    body: [
      {
        _type: "block",
        _key: "sm-h1",
        style: "h3",
        children: [{ _type: "span", _key: "sm-h1-s", text: "Scope & deliverables" }],
      },
      {
        _type: "block",
        _key: "sm-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "sm-p1-s",
            text: "Art direction for stills and short-form motion sequences, colour-graded assets, and launch trailers tailored for web and social.",
          },
        ],
      },
    ],
  },
];

export const DEFAULT_SIGNUP_PLANS: SignUpPlan[] = [
  {
    _id: "plan-framer-site",
    phaseLabel: "Phase I · Prelude",
    title: "Framer site",
    price: "€8,000",
    timeline: "3 to 5 weeks",
    features: [
      "— Design and build in Framer",
      "— CMS and motion",
      "— Recorded handover",
    ],
    ctaLabel: "Start with this",
    ctaHref: "/contact",
    coverImage: "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
    order: 1,
  },
  {
    _id: "plan-brand-identity",
    phaseLabel: "19:58 · Blue hour",
    title: "Brand identity",
    price: "€12,000",
    timeline: "4 to 6 weeks",
    features: [
      "— Strategy and naming check",
      "— Logo, type and colour",
      "— Guidelines your team will open",
    ],
    ctaLabel: "Start with this",
    ctaHref: "/contact",
    coverImage: "/assets/tiYSqeC6a3AAT9qZoZIzZYdno1k.webp",
    order: 2,
  },
  {
    _id: "plan-brand-site",
    phaseLabel: "20:41 · Afterglow",
    title: "Brand + site",
    price: "€18,000",
    timeline: "7 to 9 weeks",
    features: [
      "— Everything in both",
      "— One team, one timeline",
      "— Launch week on call",
    ],
    ctaLabel: "Start with this",
    ctaHref: "/contact",
    coverImage: "/assets/qqfZIrcNBNrGIt8lRD3pohMwqS0.webp",
    order: 3,
  },
];

export const DEFAULT_MUSIC_ITEMS: MusicItem[] = [
  {
    _id: "music-juno",
    slug: "juno",
    title: "Juno",
    year: "2026",
    time: "18:58",
    tags: "Brand identity · App UI/UX · Launch site",
    sector: "Fintech app",
    result: "Launched in 9 weeks, 40k sign-ups in month one",
    headline:
      "A savings app that feels like a calm evening, not a trading floor.",
    coverImage: "/assets/Y2X7sGZkQ49oUsVM1KLmOJ5xHU.webp",
    stills: [
      "/assets/mHP4XfgJ8bMa1xNgUvt7y0Hlmq0.webp",
      "/assets/KuzBdrMSkisZvxNb9je1m36fs.webp",
    ],
    featuredOnHome: true,
    order: 1,
    body: [
      {
        _type: "block",
        _key: "ju-h1",
        style: "h3",
        children: [{ _type: "span", _key: "ju-h1-s", text: "The brief" }],
      },
      {
        _type: "block",
        _key: "ju-p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ju-p1-s",
            text: "Juno helps people save without thinking about it. The founders wanted a brand that felt calm, warm and grown-up, in a category that shouts.",
          },
        ],
      },
      {
        _type: "block",
        _key: "ju-h2",
        style: "h3",
        children: [{ _type: "span", _key: "ju-h2-s", text: "What we made" }],
      },
      {
        _type: "block",
        _key: "ju-p2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ju-p2-s",
            text: "A dusk-toned identity, a product UI built on one soft gradient, and a Framer launch site the team now edits every week.",
          },
        ],
      },
      {
        _type: "block",
        _key: "ju-h3",
        style: "h3",
        children: [{ _type: "span", _key: "ju-h3-s", text: "How it went" }],
      },
      {
        _type: "block",
        _key: "ju-p3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ju-p3-s",
            text: "Nine weeks from first call to launch. We worked in the founders’ Slack and shipped in three drops.",
          },
        ],
      },
    ],
  },
  {
    _id: "music-kite",
    slug: "kite",
    title: "Kite",
    year: "2026",
    time: "19:16",
    tags: "Packaging · Art direction · Campaign",
    sector: "Consumer goods",
    result: "Sold out initial run in 72 hours",
    headline: "Tactile packaging and dusk-lit visuals for a quiet daily object.",
    coverImage: "/assets/8KiI4mEzaAiC4si7BIewiRbMiko.webp",
    stills: [
      "/assets/tiYSqeC6a3AAT9qZoZIzZYdno1k.webp",
      "/assets/gZoNexNHqe6GbmxzsHJaaYRsJA8.webp",
    ],
    featuredOnHome: true,
    order: 2,
  },
  {
    _id: "music-alder-hotel",
    slug: "alder-hotel",
    title: "Alder Hotel",
    year: "2025",
    time: "19:31",
    tags: "Identity · Framer site · Booking flow",
    sector: "Hospitality",
    result: "Direct bookings up 58% post-relaunch",
    headline: "A coastal sanctuary translated into slow scroll and warm ink.",
    coverImage: "/assets/gU3eOlAmRnBLtEaxFQIWfEiOM.webp",
    stills: [
      "/assets/urb7pwcsBQOWCSywBmbtIytIg.webp",
      "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
    ],
    featuredOnHome: true,
    order: 3,
  },
  {
    _id: "music-marlow",
    slug: "marlow",
    title: "Marlow",
    year: "2025",
    time: "19:47",
    tags: "Art direction · E-commerce · Lookbook",
    sector: "Apparel & objects",
    result: "Editorial lookbook converting at 4.2%",
    headline: "Season-less tailoring shot at dusk with minimal typographic noise.",
    coverImage: "/assets/vHxgnYQ47nQv909GTILXnl8Xm0.webp",
    stills: [
      "/assets/mHP4XfgJ8bMa1xNgUvt7y0Hlmq0.webp",
      "/assets/qqfZIrcNBNrGIt8lRD3pohMwqS0.webp",
    ],
    featuredOnHome: true,
    order: 4,
  },
  {
    _id: "music-ridge",
    slug: "ridge",
    title: "Ridge",
    year: "2024",
    time: "20:02",
    tags: "Product UI · Design system · Marketing site",
    sector: "Developer tools",
    result: "Unified 4 product surfaces under one token set",
    headline: "High-precision UI balanced against warm atmospheric surfaces.",
    coverImage: "/assets/X5mjlMnAVB4TZoburb19UnqInU.webp",
    stills: [
      "/assets/w2UlbKx2Vdo5e7BnZeNPIe1yo.webp",
      "/assets/ocAm6qW5p5Zumd8tOOxG8CwzdZw.webp",
    ],
    featuredOnHome: true,
    order: 5,
  },
  {
    _id: "music-linen",
    slug: "linen",
    title: "Linen",
    year: "2024",
    time: "20:18",
    tags: "Identity · Packaging · Shop",
    sector: "Print & paper",
    result: "Stocked in 24 independent bookshops",
    headline: "Stationery and digital storefront stripped back to texture and type.",
    coverImage: "/assets/x5ESroMsYGsarXZ1xWgAtRNHlUo.webp",
    stills: [
      "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
      "/assets/tiYSqeC6a3AAT9qZoZIzZYdno1k.webp",
    ],
    featuredOnHome: false,
    order: 6,
  },
  {
    _id: "music-cove",
    slug: "cove",
    title: "Cove",
    year: "2024",
    time: "20:33",
    tags: "Travel brand · Website · Photography",
    sector: "Travel",
    result: "Featured across 6 international design journals",
    headline: "Field guides and small-group retreats built around the last light.",
    coverImage: "/assets/LDux8qLU1zO4PKEK1rBPn6yPAfA.webp",
    stills: [
      "/assets/qqfZIrcNBNrGIt8lRD3pohMwqS0.webp",
      "/assets/NITgIgJ8ZM7cZzQ9k8k8NoCMGc.webp",
    ],
    featuredOnHome: false,
    order: 7,
  },
  {
    _id: "music-vale",
    slug: "vale",
    title: "Vale",
    year: "2023",
    time: "20:51",
    tags: "Film · Lookbook · Campaign",
    sector: "Music & visuals",
    result: "Over 1.2M organic premiere views",
    headline: "Short film and companion release visualised in deep cobalt and rose.",
    coverImage: "/assets/clua8EEkWpOsWrBVNUmgiHKzG8.webp",
    stills: [
      "/assets/Eb1uFBWT6v6lD14cKqee1Rr2Iw4.webp",
      "/assets/urb7pwcsBQOWCSywBmbtIytIg.webp",
    ],
    featuredOnHome: false,
    order: 8,
  },
];
