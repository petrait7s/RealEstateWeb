/** Mock content used until Supabase is wired (Phase 2). Shapes mirror the planned DB tables. */
export type L = { en: string; bn: string };
export type ProjectType = "flat" | "plot" | "villa" | "commercial";
export type ProjectStatus = "ongoing" | "upcoming" | "completed";
export type UnitStatus = "available" | "booked" | "sold" | "hold";

export interface Project {
  slug: string;
  name: L;
  location: L;
  locationKey: string;
  type: ProjectType;
  status: ProjectStatus;
  tagline: L;
  priceFrom: number; // BDT
  sizeFrom: number; // sq ft
  sizeTo: number;
  beds: string;
  floors: number;
  unitsPerFloor: number;
  handover: string;
  hue: number;
  featured: boolean;
  amenities: string[];
  map: [number, number]; // 0-100 pseudo-map coords
}

export const projects: Project[] = [
  {
    slug: "the-meridian",
    name: { en: "The Meridian", bn: "দ্য মেরিডিয়ান" },
    location: { en: "Gulshan, Dhaka", bn: "গুলশান, ঢাকা" },
    locationKey: "gulshan",
    type: "flat",
    status: "ongoing",
    tagline: { en: "Twin towers above the lake", bn: "লেকের ওপরে জোড়া টাওয়ার" },
    priceFrom: 24500000,
    sizeFrom: 1850,
    sizeTo: 3200,
    beds: "3–4",
    floors: 14,
    unitsPerFloor: 4,
    handover: "Dec 2027",
    hue: 38,
    featured: true,
    amenities: ["pool", "gym", "spa", "garden", "parking", "security"],
    map: [58, 38],
  },
  {
    slug: "riverside-villas",
    name: { en: "Riverside Villas", bn: "রিভারসাইড ভিলাস" },
    location: { en: "Purbachal, Dhaka", bn: "পূর্বাচল, ঢাকা" },
    locationKey: "purbachal",
    type: "villa",
    status: "upcoming",
    tagline: { en: "Private villas on the water", bn: "জলের ধারে ব্যক্তিগত ভিলা" },
    priceFrom: 68000000,
    sizeFrom: 3600,
    sizeTo: 5400,
    beds: "4–5",
    floors: 3,
    unitsPerFloor: 2,
    handover: "Jun 2028",
    hue: 160,
    featured: true,
    amenities: ["pool", "garden", "clubhouse", "security", "parking"],
    map: [82, 30],
  },
  {
    slug: "horizon-heights",
    name: { en: "Horizon Heights", bn: "হরাইজন হাইটস" },
    location: { en: "Bashundhara R/A, Dhaka", bn: "বসুন্ধরা আ/এ, ঢাকা" },
    locationKey: "bashundhara",
    type: "flat",
    status: "completed",
    tagline: { en: "Delivered. Lived in. Loved.", bn: "হস্তান্তরিত। বসবাসরত। প্রিয়।" },
    priceFrom: 13200000,
    sizeFrom: 1200,
    sizeTo: 2100,
    beds: "2–3",
    floors: 10,
    unitsPerFloor: 4,
    handover: "Delivered 2023",
    hue: 215,
    featured: true,
    amenities: ["gym", "parking", "security", "garden"],
    map: [70, 52],
  },
  {
    slug: "emerald-park-plots",
    name: { en: "Emerald Park Plots", bn: "এমারেল্ড পার্ক প্লটস" },
    location: { en: "Purbachal, Dhaka", bn: "পূর্বাচল, ঢাকা" },
    locationKey: "purbachal",
    type: "plot",
    status: "ongoing",
    tagline: { en: "Planned plots, ready to build", bn: "পরিকল্পিত প্লট, নির্মাণের জন্য প্রস্তুত" },
    priceFrom: 9800000,
    sizeFrom: 3,
    sizeTo: 10,
    beds: "—",
    floors: 0,
    unitsPerFloor: 0,
    handover: "Ready",
    hue: 120,
    featured: false,
    amenities: ["park", "mosque", "security", "roads"],
    map: [88, 44],
  },
  {
    slug: "skyline-commercial",
    name: { en: "Skyline Commercial", bn: "স্কাইলাইন কমার্শিয়াল" },
    location: { en: "Uttara, Dhaka", bn: "উত্তরা, ঢাকা" },
    locationKey: "uttara",
    type: "commercial",
    status: "ongoing",
    tagline: { en: "Grade-A offices, retail podium", bn: "গ্রেড-এ অফিস ও রিটেইল" },
    priceFrom: 31000000,
    sizeFrom: 900,
    sizeTo: 6000,
    beds: "—",
    floors: 18,
    unitsPerFloor: 4,
    handover: "Mar 2028",
    hue: 280,
    featured: false,
    amenities: ["parking", "security", "gym"],
    map: [50, 12],
  },
  {
    slug: "serene-courtyard",
    name: { en: "Serene Courtyard", bn: "সেরিন কোর্টইয়ার্ড" },
    location: { en: "Gulshan, Dhaka", bn: "গুলশান, ঢাকা" },
    locationKey: "gulshan",
    type: "flat",
    status: "upcoming",
    tagline: { en: "Boutique 8-storey residences", bn: "বুটিক ৮ তলা আবাসন" },
    priceFrom: 19800000,
    sizeFrom: 1500,
    sizeTo: 2400,
    beds: "3",
    floors: 8,
    unitsPerFloor: 4,
    handover: "Sep 2028",
    hue: 20,
    featured: true,
    amenities: ["garden", "gym", "parking", "security"],
    map: [44, 46],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export interface Unit {
  id: string;
  floor: number;
  label: string;
  size: number;
  facing: string;
  beds: number;
  baths: number;
  price: number;
  status: UnitStatus;
}

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}
const hash = (str: string) => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export function getUnits(p: Project): Unit[] {
  const r = rng(hash(p.slug));
  const facings = ["North", "South", "East", "West"];
  const out: Unit[] = [];
  const per = p.unitsPerFloor || 4;
  for (let f = 1; f <= p.floors; f++) {
    for (let i = 0; i < per; i++) {
      const size = Math.round((p.sizeFrom + r() * (p.sizeTo - p.sizeFrom)) / 10) * 10;
      const ppsf = p.priceFrom / p.sizeFrom;
      const rnd = r();
      out.push({
        id: `${p.slug}-${f}${"ABCDEF"[i]}`,
        floor: f,
        label: `${f}${"ABCDEF"[i]}`,
        size,
        facing: facings[i % 4]!,
        beds: size > 2400 ? 4 : size > 1600 ? 3 : 2,
        baths: size > 2400 ? 4 : 3,
        price: Math.round((size * ppsf * (1 + f * 0.012)) / 10000) * 10000,
        status: rnd < 0.5 ? "available" : rnd < 0.72 ? "sold" : rnd < 0.9 ? "booked" : "hold",
      });
    }
  }
  return out;
}

export interface Plot {
  id: string;
  no: number;
  katha: number;
  facing: string;
  road: number;
  corner: boolean;
  park: boolean;
  price: number;
  status: UnitStatus;
  col: number;
  row: number;
}

export const KATHA_SQFT = 720;

export function getPlots(p: Project): Plot[] {
  const r = rng(hash(p.slug) + 3);
  const out: Plot[] = [];
  const cols = 8;
  const rows = 5;
  let n = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const katha = [3, 4, 5, 6, 8, 10][Math.floor(r() * 6)]!;
      const rnd = r();
      out.push({
        id: `${p.slug}-p${n}`,
        no: n,
        katha,
        facing: ["North", "South", "East", "West"][(col + row) % 4]!,
        road: [20, 30, 40][Math.floor(r() * 3)]!,
        corner: col === 0 || col === cols - 1,
        park: row === 2 && col % 3 === 0,
        price: katha * 3_300_000 + Math.round(r() * 8) * 100_000,
        status: rnd < 0.5 ? "available" : rnd < 0.75 ? "sold" : rnd < 0.9 ? "booked" : "hold",
        col,
        row,
      });
      n++;
    }
  }
  return out;
}

export const testimonials = [
  {
    name: "Rahim & Nusrat Chowdhury",
    role: { en: "Horizon Heights owners", bn: "হরাইজন হাইটস মালিক" },
    quote: {
      en: "They handed over a month early and every finish matched the sample flat. Rare in this market.",
      bn: "এক মাস আগেই হস্তান্তর করেছে, আর প্রতিটি ফিনিশিং স্যাম্পল ফ্ল্যাটের মতোই। বাজারে বিরল।",
    },
  },
  {
    name: "Tahmina Akter",
    role: { en: "Plot buyer, Purbachal", bn: "প্লট ক্রেতা, পূর্বাচল" },
    quote: {
      en: "Transparent pricing, clear papers, and the live availability map made choosing easy.",
      bn: "স্বচ্ছ মূল্য, পরিষ্কার কাগজপত্র, আর লাইভ ম্যাপ দেখে বেছে নেওয়া সহজ হয়েছে।",
    },
  },
  {
    name: "Imran Hossain",
    role: { en: "Investor", bn: "বিনিয়োগকারী" },
    quote: {
      en: "Three projects in, zero surprises. The team treats you like a partner.",
      bn: "তিনটি প্রকল্প, কোনো চমক নেই। টিম অংশীদারের মতো আচরণ করে।",
    },
  },
];

export const posts = [
  {
    slug: "buying-first-flat-guide",
    date: "2026-10-12",
    hue: 38,
    title: {
      en: "A first-time buyer's guide to buying a flat in Dhaka",
      bn: "ঢাকায় প্রথম ফ্ল্যাট কেনার গাইড",
    },
    excerpt: {
      en: "Documents to check, questions to ask and mistakes to avoid before you pay a token.",
      bn: "টোকেন দেওয়ার আগে কোন কাগজ দেখবেন, কী প্রশ্ন করবেন, কী এড়াবেন।",
    },
  },
  {
    slug: "katha-vs-decimal",
    date: "2026-09-28",
    hue: 160,
    title: {
      en: "Katha, decimal and square feet — a plain-English converter guide",
      bn: "কাঠা, শতক ও বর্গফুট — সহজ ভাষায় রূপান্তর",
    },
    excerpt: {
      en: "Stop guessing. Learn how land units relate and how to price per sq ft.",
      bn: "আন্দাজ নয়। জমির একক কীভাবে সম্পর্কিত ও বর্গফুট দর কীভাবে হিসাব করবেন।",
    },
  },
  {
    slug: "meridian-progress-oct",
    date: "2026-10-30",
    hue: 215,
    title: {
      en: "The Meridian: structure reaches the 9th floor",
      bn: "দ্য মেরিডিয়ান: কাঠামো ৯ম তলায়",
    },
    excerpt: {
      en: "October site update with progress photos and the handover schedule.",
      bn: "অক্টোবরের সাইট আপডেট, ছবি ও হস্তান্তর সূচি।",
    },
  },
];

export const teamMembers = [
  { name: "Farhan Ahmed", role: { en: "Managing Director", bn: "ব্যবস্থাপনা পরিচালক" } },
  { name: "Sadia Rahman", role: { en: "Head of Design", bn: "ডিজাইন প্রধান" } },
  { name: "Kamal Uddin", role: { en: "Chief Engineer", bn: "প্রধান প্রকৌশলী" } },
  { name: "Nabila Karim", role: { en: "Head of Sales", bn: "বিক্রয় প্রধান" } },
];
