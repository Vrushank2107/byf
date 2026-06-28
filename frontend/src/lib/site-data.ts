import blanket from "@/assets/byf/blanket.jpg";
import chappal from "@/assets/byf/chappal.jpg";
import diwali from "@/assets/byf/diwali.jpg";
import diwali2 from "@/assets/byf/diwali2.jpg";
import diwali3 from "@/assets/byf/diwali3.jpg";
import flag from "@/assets/byf/flag.jpg";
import holi from "@/assets/byf/holi.jpg";
import holi2 from "@/assets/byf/holi2.jpg";
import holi3 from "@/assets/byf/holi3.jpg";
import joycation1 from "@/assets/byf/joycation1.jpg";

import heroEducation from "@/assets/hero-education.jpg";
import heroBlankets from "@/assets/hero-blankets.jpg";
import heroFlood from "@/assets/hero-flood.jpg";
import heroWomen from "@/assets/hero-women.jpg";
import pNotebooks from "@/assets/project-notebooks.jpg";
import pSanitary from "@/assets/project-sanitary.jpg";
import pRotibank from "@/assets/project-rotibank.jpg";
import pJoycation from "@/assets/project-joycation.jpg";

export const IMG = {
  blanket,
  chappal,
  diwali,
  diwali2,
  diwali3,
  flag,
  holi,
  holi2,
  holi3,
  joycation1,
  heroEducation,
  heroBlankets,
  heroFlood,
  heroWomen,
  pNotebooks,
  pSanitary,
  pRotibank,
  pJoycation,
};

export const ORG = {
  name: "Baroda Youth Federation",
  short: "BYF",
  tagline: "Together We Can, Together We Care",
  email: "contact@barodayouthfederation.org",
  phone: "+91 97237 84628",
  whatsapp: "919723784628",
  whatsappName: "Rukmil Shah",
  address: "Vadodara, Gujarat, India",
  social: {
    instagram: "https://www.instagram.com/baroda_youth_federation/",
    facebook: "https://www.facebook.com/p/Baroda-YOUTH-Federation-100072446950431/",
    twitter: "https://x.com/BarodaYouth",
    youtube: "https://www.youtube.com/@barodayouthfederation1956",
  },
  /** Founder Rukmil Shah's personal portfolio URL. Leave empty to hide the button. */
  founderPortfolioUrl: "" as string,
};

export const IMPACT_STATS = [
  { value: 5000, suffix: "+", label: "Students Reached", color: "primary" },
  { value: 50000, suffix: "+", label: "Notebooks Distributed", color: "secondary" },
  { value: 10000, suffix: "+", label: "Blankets Distributed", color: "accent" },
  { value: 61000, suffix: "+", label: "Flood Relief Beneficiaries", color: "primary" },
  { value: 3000, suffix: "+", label: "Cultural Awareness Students", color: "secondary" },
] as const;

export const MISSIONS = [
  {
    title: "Education",
    desc: "Books, notebooks and confidence for every child who wants to learn.",
    icon: "GraduationCap",
  },
  {
    title: "Rural Development",
    desc: "Working with villages around Vadodara to build dignity, infrastructure and opportunity.",
    icon: "Sprout",
  },
  {
    title: "Women Empowerment",
    desc: "Skill workshops, health drives and safe spaces so women lead their own change.",
    icon: "Heart",
  },
  {
    title: "Environmental Sustainability",
    desc: "Tree drives, plastic-free events and clean-ups that keep our city breathing.",
    icon: "Leaf",
  },
  {
    title: "Cultural Preservation",
    desc: "Celebrating Holi, Diwali and Uttarayan with children who would otherwise miss them.",
    icon: "Sparkles",
  },
] as const;

export type ProjectCategory =
  | "Education"
  | "Women Empowerment"
  | "Community Welfare"
  | "Disaster Relief"
  | "Cultural Activities"
  | (string & {});

export const PROJECT_CATEGORY_OPTIONS = [
  "Education",
  "Women Empowerment",
  "Community Welfare",
  "Disaster Relief",
  "Cultural Activities",
] as const;

export const PROJECT_CUSTOM_CATEGORY_OPTION = "Other";

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  short: string;
  fullStory?: string;
  image: string;
  stats: { value: string; label: string }[];
  progress: number;
  showInHero?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "project-progress",
    title: "Project Progress",
    category: "Education",
    short: "Year-long tuition and mentorship for first-generation learners in Vadodara's outer wards.",
    image: IMG.heroEducation,
    stats: [{ value: "1,200+", label: "Students mentored" }, { value: "38", label: "Volunteer tutors" }],
    progress: 72,
  },
  {
    slug: "joycation",
    title: "JoyCation",
    category: "Community Welfare",
    short: "Day-out trips, art kits and a hot meal for children who have never been on a picnic.",
    image: IMG.joycation1,
    stats: [{ value: "850+", label: "Kids hosted" }, { value: "12", label: "Editions" }],
    progress: 65,
  },
  {
    slug: "sankalp",
    title: "Project Sankalp",
    category: "Education",
    short: "50,000+ notebooks and stationery kits handed out before every academic year.",
    image: IMG.pNotebooks,
    stats: [{ value: "50,000+", label: "Notebooks" }, { value: "180", label: "Schools" }],
    progress: 88,
  },
  {
    slug: "sanitary-pads",
    title: "Sanitary Pad Distribution",
    category: "Women Empowerment",
    short: "Free pads, dignity kits and menstrual-health sessions for adolescent girls.",
    image: IMG.pSanitary,
    stats: [{ value: "22,000+", label: "Girls reached" }, { value: "60+", label: "Schools covered" }],
    progress: 54,
  },
  {
    slug: "flood-relief",
    title: "Flood Relief Work",
    category: "Disaster Relief",
    short: "Food packets, drinking water and medical aid during the 2024 Vadodara floods.",
    image: IMG.heroFlood,
    stats: [{ value: "61,000+", label: "Beneficiaries" }, { value: "28", label: "Relief days" }],
    progress: 100,
  },
  {
    slug: "roti-bank",
    title: "Roti Bank",
    category: "Community Welfare",
    short: "Hot rotis and sabzi distributed nightly to homeless families across the city.",
    image: IMG.pRotibank,
    stats: [{ value: "1,400", label: "Meals / week" }, { value: "5", label: "Years running" }],
    progress: 80,
  },
  {
    slug: "blanket-drive",
    title: "Winter Blanket Drive",
    category: "Community Welfare",
    short: "Warm blankets for the elderly, daily-wage workers and street families every winter.",
    image: IMG.blanket,
    stats: [{ value: "10,000+", label: "Blankets" }, { value: "9", label: "Winters" }],
    progress: 92,
  },
  {
    slug: "festival-celebrations",
    title: "Festival Celebrations",
    category: "Cultural Activities",
    short: "Holi, Diwali and Uttarayan with kids in slum schools — colour, sweets, kites and joy.",
    image: IMG.diwali3,
    stats: [{ value: "3,000+", label: "Children" }, { value: "20+", label: "Events" }],
    progress: 70,
  },
];

export const TIMELINE = [
  { year: "2014", title: "BYF Founded", desc: "A small group of Vadodara students start weekend tuition in two slum pockets." },
  { year: "2016", title: "Project Sankalp launches", desc: "First city-wide notebook distribution: 8,000 books across 40 schools." },
  { year: "2018", title: "Roti Bank begins", desc: "Nightly meal program for the homeless and migrant workers." },
  { year: "2020", title: "COVID Relief", desc: "Ration kits and oxygen concentrator support during the pandemic surge." },
  { year: "2022", title: "Women's Health Drive", desc: "Sanitary Pad Distribution expands to 60+ government schools." },
  { year: "2024", title: "Vadodara Flood Relief", desc: "61,000+ people reached with food, water and medical aid in 28 days." },
  { year: "2025", title: "10 Years of BYF", desc: "Crossed 5,000 students reached and 10,000 blankets distributed." },
];

export const LEADERSHIP = [
  { name: "Rukmil Shah", role: "Founder & President", bio: "Founded BYF in 2014. Leads strategy, partnerships and the volunteer movement across Vadodara." },
];

export const TESTIMONIALS = [
  {
    name: "Meena Ben",
    role: "Beneficiary, Roti Bank",
    quote: "On the nights I cannot work, BYF makes sure my children eat. They have given my family back its dignity.",
    image: IMG.blanket,
  },
  {
    name: "Riya, age 14",
    role: "Student, Project Progress",
    quote: "My didi from BYF taught me English for two years. This year I topped my class in board exams.",
    image: IMG.flag,
  },
  {
    name: "Kunal Trivedi",
    role: "Volunteer since 2019",
    quote: "I came for one Sunday and stayed six years. BYF is the most honest, hands-on NGO in Vadodara.",
    image: IMG.joycation1,
  },
];

export const ACTIVITIES = [
  { title: "Diwali night for 200 children", date: "Nov 1, 2024", image: IMG.diwali3, tag: "Diwali" },
  { title: "Holi colour drive in Waghodia", date: "Mar 25, 2024", image: IMG.holi2, tag: "Holi" },
  { title: "Notebook distribution at primary school", date: "Jun 18, 2024", image: IMG.flag, tag: "Education" },
  { title: "Footwear distribution", date: "Apr 14, 2024", image: IMG.chappal, tag: "Welfare" },
  { title: "Winter blanket drive — Sayajigunj", date: "Dec 22, 2024", image: IMG.blanket, tag: "Blankets" },
  { title: "JoyCation outing to Sayaji Baug", date: "May 5, 2024", image: IMG.joycation1, tag: "JoyCation" },
];

export const GALLERY = [
  { src: IMG.joycation1, tag: "JoyCation", alt: "Children at JoyCation event with BYF volunteers" },
  { src: IMG.flag, tag: "Education", alt: "Students with national flag distribution" },
  { src: IMG.holi, tag: "Holi", alt: "Holi celebration with children" },
  { src: IMG.diwali3, tag: "Diwali", alt: "Diwali fireworks celebration with kids" },
  { src: IMG.blanket, tag: "Blanket Distribution", alt: "Blanket distribution at night" },
  { src: IMG.holi2, tag: "Holi", alt: "Children playing Holi in village" },
  { src: IMG.diwali, tag: "Diwali", alt: "Volunteer celebrating Diwali with a child" },
  { src: IMG.chappal, tag: "Education", alt: "Footwear distribution for children" },
  { src: IMG.diwali2, tag: "Diwali", alt: "Diwali group photo with volunteers" },
  { src: IMG.holi3, tag: "Holi", alt: "Village Holi group photo" },
  { src: IMG.pSanitary, tag: "Sanitary Program", alt: "Women receiving sanitary pad kits" },
  { src: IMG.heroFlood, tag: "Flood Relief", alt: "Flood relief volunteers distributing food" },
  { src: IMG.pNotebooks, tag: "Education", alt: "Schoolgirl receiving notebooks" },
  { src: IMG.heroBlankets, tag: "Blanket Distribution", alt: "Elderly women receiving blankets" },
  { src: IMG.pRotibank, tag: "Sanitary Program", alt: "Roti bank volunteers preparing meals" },
  { src: IMG.heroEducation, tag: "Education", alt: "Volunteers with students at village school" },
] as const;

export const GALLERY_TAGS = [
  "All",
  "Education",
  "JoyCation",
  "Holi",
  "Diwali",
  "Uttarayan",
  "Blanket Distribution",
  "Sanitary Program",
  "Flood Relief",
] as const;

export const GALLERY_TAG_OPTIONS = GALLERY_TAGS.filter((tag) => tag !== "All");

export const GALLERY_CUSTOM_TAG_OPTION = "Other";

export function getGalleryFilterTags(items: { tag: string }[]): string[] {
  const predefined = new Set<string>(GALLERY_TAG_OPTIONS);
  const custom = [...new Set(items.map((item) => item.tag))]
    .filter((tag) => !predefined.has(tag))
    .sort((a, b) => a.localeCompare(b));
  return ["All", ...GALLERY_TAG_OPTIONS, ...custom];
}

export const EVENTS = [
  {
    title: "Annual Notebook Distribution Drive",
    date: "2026-07-12",
    location: "Vadodara — 12 schools",
    description: "50,000+ notebooks and stationery kits handed to students before the new academic year.",
    image: IMG.pNotebooks,
    upcoming: true,
  },
  {
    title: "Independence Day Flag Distribution",
    date: "2026-08-15",
    location: "Government Primary School, Waghodia",
    description: "National flags, sweets and a patriotic assembly for 600+ children.",
    image: IMG.flag,
    upcoming: true,
  },
  {
    title: "Winter Blanket Drive 2026",
    date: "2026-12-18",
    location: "Sayajigunj & Old City",
    description: "Distribute 1,500 blankets to street families, daily-wage workers and the elderly.",
    image: IMG.blanket,
    upcoming: true,
  },
  {
    title: "Diwali with the Children",
    date: "2025-11-01",
    location: "Atladara Community Center",
    description: "Diyas, sweets, sparklers and a hot meal with 200 children from nearby slums.",
    image: IMG.diwali3,
    upcoming: false,
  },
  {
    title: "Holi Colour Drive",
    date: "2025-03-25",
    location: "Waghodia Village",
    description: "Organic colours, music and lunch for 300+ village children.",
    image: IMG.holi2,
    upcoming: false,
  },
  {
    title: "JoyCation #12 — Sayaji Baug",
    date: "2025-05-05",
    location: "Sayaji Baug, Vadodara",
    description: "Day-out for 90 children with art, games, a hot lunch and a bus ride back home.",
    image: IMG.joycation1,
    upcoming: false,
  },
];

export const BLOG = [
  {
    slug: "five-years-of-roti-bank",
    title: "Five years, 3 lakh meals — what Roti Bank taught us",
    excerpt: "How a small Sunday-evening idea grew into a nightly operation serving over 1,400 meals a week.",
    category: "Success Stories",
    date: "2025-09-10",
    image: IMG.pRotibank,
    read: "6 min",
  },
  {
    slug: "diwali-with-the-children",
    title: "Diwali with 200 kids who had never lit a sparkler",
    excerpt: "What an evening of light, laddoos and fireworks looked like through their eyes.",
    category: "Activities",
    date: "2024-11-04",
    image: IMG.diwali3,
    read: "4 min",
  },
  {
    slug: "vadodara-flood-response",
    title: "Inside the 28-day Vadodara flood response",
    excerpt: "How 450 volunteers reached 61,000+ people with food, water and medicine.",
    category: "Community Impact",
    date: "2024-09-20",
    image: IMG.heroFlood,
    read: "8 min",
  },
  {
    slug: "i-came-for-a-sunday",
    title: "I came for a Sunday and stayed six years",
    excerpt: "A long-time BYF volunteer on what really keeps her coming back every week.",
    category: "Volunteer Experiences",
    date: "2025-02-14",
    image: IMG.joycation1,
    read: "5 min",
  },
  {
    slug: "menstrual-health-curriculum",
    title: "Designing a menstrual-health curriculum that girls actually want",
    excerpt: "What we learned from 60 schools, 22,000 girls and a lot of honest conversations.",
    category: "Community Impact",
    date: "2025-04-02",
    image: IMG.pSanitary,
    read: "7 min",
  },
  {
    slug: "blanket-drive-2024",
    title: "10,000 blankets later — the math of warmth",
    excerpt: "How we plan, source and distribute blankets without a single rupee of overhead.",
    category: "Success Stories",
    date: "2025-01-08",
    image: IMG.blanket,
    read: "5 min",
  },
];

export const PARTNERS = [
  "L&T", "Reliance Foundation", "Tata Trusts", "Adani Foundation",
  "HDFC Parivartan", "Infosys Foundation", "Axis Bank Foundation", "ICICI Foundation",
];

export const DONATION_FUNDS = [
  {
    slug: "education-fund",
    title: "Education Fund",
    desc: "Notebooks, books, uniforms and tuition for 5,000+ first-generation learners.",
    raised: 7_80_000,
    goal: 12_00_000,
    accent: "primary",
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    desc: "Sanitary pads, dignity kits and skill workshops across 60 schools.",
    raised: 3_40_000,
    goal: 6_00_000,
    accent: "secondary",
  },
  {
    slug: "relief-fund",
    title: "Relief Fund",
    desc: "Standby fund for floods, fires and emergencies in and around Vadodara.",
    raised: 11_20_000,
    goal: 15_00_000,
    accent: "accent",
  },
  {
    slug: "general-fund",
    title: "General Fund",
    desc: "Lets BYF send help where it's needed most — Roti Bank, blankets, festivals and more.",
    raised: 4_60_000,
    goal: 10_00_000,
    accent: "primary",
  },
];
