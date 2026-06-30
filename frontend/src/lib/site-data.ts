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
  short: "Baroda Youth Federation",
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
  images?: string[];
  stats: { value: string; label: string }[];
  progress: number;
  showInHero?: boolean;
  order?: number;
}

export const PROJECTS: Project[] = [
  {
    slug: "project-progress",
    title: "Project Progress",
    category: "Education",
    short: "Year-long tuition and mentorship for first-generation learners in Vadodara's outer wards. Weekend classes covering all subjects with dedicated volunteer tutors.",
    fullStory: "Project Progress provides comprehensive academic support to first-generation learners from economically weaker sections. Our volunteer tutors conduct weekend classes covering Mathematics, Science, English and Social Studies. The program includes regular assessments, parent-teacher meetings, and career guidance sessions. Started in 2018, the program has helped over 1,200 students improve their academic performance and continue their education.",
    image: IMG.heroEducation,
    stats: [{ value: "1,200+", label: "Students mentored" }, { value: "38", label: "Volunteer tutors" }, { value: "15", label: "Centers" }],
    progress: 72,
  },
  {
    slug: "joycation",
    title: "JoyCation",
    category: "Community Welfare",
    short: "Day-out trips, art kits and a hot meal for children who have never been on a picnic. Creating memorable experiences for underprivileged children.",
    fullStory: "JoyCation is our flagship happiness program that takes underprivileged children on day trips to parks, museums, and recreational centers. Many of these children have never left their neighborhoods or experienced such outings. Each JoyCation includes transportation, art kits, games, a nutritious meal, and guided activities. The program aims to provide exposure, build confidence, and create joyful memories that last a lifetime.",
    image: IMG.joycation1,
    stats: [{ value: "850+", label: "Kids hosted" }, { value: "12", label: "Editions" }, { value: "8", label: "Locations" }],
    progress: 65,
  },
  {
    slug: "sankalp",
    title: "Project Sankalp",
    category: "Education",
    short: "50,000+ notebooks and stationery kits handed out before every academic year. Ensuring every child has the tools to learn.",
    fullStory: "Project Sankalp is our annual notebook distribution drive that provides essential educational supplies to underprivileged students before the start of each academic year. The distribution includes notebooks, pens, pencils, erasers, geometry boxes, and school bags. We work with government schools and community centers to identify deserving students. The program has grown from distributing 8,000 notebooks in 2018 to over 50,000 in 2025.",
    image: IMG.pNotebooks,
    stats: [{ value: "50,000+", label: "Notebooks" }, { value: "180", label: "Schools" }, { value: "12,000", label: "Students" }],
    progress: 88,
  },
  {
    slug: "sanitary-pads",
    title: "Sanitary Pad Distribution",
    category: "Women Empowerment",
    short: "Free pads, dignity kits and menstrual-health sessions for adolescent girls. Breaking taboos and ensuring menstrual hygiene.",
    fullStory: "Our Sanitary Pad Distribution program addresses menstrual health management among adolescent girls from low-income families. We distribute free sanitary pads along with dignity kits containing hygiene products. The program includes educational sessions on menstrual health, hygiene practices, and breaking societal taboos. We work with government schools and community health centers to reach girls who would otherwise miss school during their periods.",
    image: IMG.pSanitary,
    stats: [{ value: "22,000+", label: "Girls reached" }, { value: "60+", label: "Schools covered" }, { value: "150", label: "Health sessions" }],
    progress: 54,
  },
  {
    slug: "flood-relief",
    title: "Flood Relief Work",
    category: "Disaster Relief",
    short: "Food packets, drinking water and medical aid during the 2024 Vadodara floods. Emergency response when it matters most.",
    fullStory: "During the devastating Vadodara floods of 2024, Baroda Youth Federation mobilized 450 volunteers for emergency relief operations. We distributed food packets, drinking water, medicines, and essential relief materials to affected families. Our team worked with local authorities to identify the most vulnerable populations and ensure timely assistance. The 28-day operation reached over 61,000 people across the worst-affected areas.",
    image: IMG.heroFlood,
    stats: [{ value: "61,000+", label: "Beneficiaries" }, { value: "28", label: "Relief days" }, { value: "450", label: "Volunteers" }],
    progress: 100,
  },
  {
    slug: "roti-bank",
    title: "Roti Bank",
    category: "Community Welfare",
    short: "Hot rotis and sabzi distributed nightly to homeless families across the city. No one should sleep hungry in Vadodara.",
    fullStory: "Roti Bank is our nightly food distribution program that serves hot meals to homeless individuals, migrant workers, and families in need. Every evening, our volunteers prepare fresh rotis and vegetable curry, then distribute them at identified locations across the city. The program started as a small initiative in 2019 and has grown to serve over 1,400 meals per week. We believe that no one should go to bed hungry in our city.",
    image: IMG.pRotibank,
    stats: [{ value: "1,400", label: "Meals / week" }, { value: "6", label: "Years running" }, { value: "3,00,000", label: "Total meals" }],
    progress: 80,
  },
  {
    slug: "blanket-drive",
    title: "Winter Blanket Drive",
    category: "Community Welfare",
    short: "Warm blankets for the elderly, daily-wage workers and street families every winter. Bringing warmth to those who need it most.",
    fullStory: "Our Winter Blanket Drive is an annual initiative that distributes warm blankets to vulnerable populations during the harsh winter months. We identify homeless individuals, elderly citizens living alone, daily-wage workers, and street families who are most exposed to the cold. The drive runs from December to February, with volunteers conducting night rounds to distribute blankets. Since inception, we have distributed over 10,000 blankets across Vadodara.",
    image: IMG.blanket,
    stats: [{ value: "10,000+", label: "Blankets" }, { value: "9", label: "Winters" }, { value: "25", label: "Distribution points" }],
    progress: 92,
  },
  {
    slug: "festival-celebrations",
    title: "Festival Celebrations",
    category: "Cultural Activities",
    short: "Holi, Diwali and Uttarayan with kids in slum schools — colour, sweets, kites and joy. Every child deserves to celebrate.",
    fullStory: "Our Festival Celebrations program ensures that underprivileged children experience the joy of Indian festivals. We organize celebrations for Holi, Diwali, Uttarayan, Independence Day, and other major festivals at slum schools and community centers. Each celebration includes traditional elements like colors for Holi, diyas and sweets for Diwali, kites for Uttarayan, along with educational sessions about the significance of each festival. The program has reached over 3,000 children across 20+ events.",
    image: IMG.diwali3,
    stats: [{ value: "3,000+", label: "Children" }, { value: "20+", label: "Events" }, { value: "8", label: "Festivals" }],
    progress: 70,
  },
];

export const TIMELINE = [
  { year: "2017", title: "Baroda Youth Federation Founded", desc: "A small group of Vadodara students start weekend tuition in two slum pockets." },
  { year: "2018", title: "Project Sankalp launches", desc: "First city-wide notebook distribution: 8,000 books across 40 schools." },
  { year: "2019", title: "Roti Bank begins", desc: "Nightly meal program for the homeless and migrant workers." },
  { year: "2020", title: "COVID Relief", desc: "Ration kits and oxygen concentrator support during the pandemic surge." },
  { year: "2021", title: "Women's Health Drive", desc: "Sanitary Pad Distribution expands to 60+ government schools." },
  { year: "2022", title: "JoyCation Program Launch", desc: "Day-out trips and art kits for children who have never been on a picnic." },
  { year: "2023", title: "Winter Blanket Drive Expansion", desc: "Blanket distribution reaches 10,000+ across Vadodara." },
  { year: "2024", title: "Vadodara Flood Relief", desc: "61,000+ people reached with food, water and medical aid in 28 days." },
  { year: "2025", title: "8 Years of Impact", desc: "Crossed 5,000 students reached and 10,000 blankets distributed." },
  { year: "2026", title: "Ongoing Missions", desc: "Continuing education, health, relief and cultural programs across Vadodara with expanded volunteer network." },
];

export const LEADERSHIP = [
  { name: "Rukmil Shah", role: "Founder & President", bio: "Founded Baroda Youth Federation in 2017. Leads strategy, partnerships and the volunteer movement across Vadodara." },
];

export const TESTIMONIALS = [
  {
    name: "Meena Ben",
    role: "Beneficiary, Roti Bank",
    quote: "On the nights I cannot work, Baroda Youth Federation makes sure my children eat. They have given my family back its dignity.",
    image: IMG.blanket,
  },
  {
    name: "Riya, age 14",
    role: "Student, Project Progress",
    quote: "My didi from Baroda Youth Federation taught me English for two years. This year I topped my class in board exams.",
    image: IMG.flag,
  },
  {
    name: "Kunal Trivedi",
    role: "Volunteer since 2019",
    quote: "I came for one Sunday and stayed six years. Baroda Youth Federation is the most honest, hands-on NGO in Vadodara.",
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
  { src: IMG.joycation1, tag: "JoyCation", alt: "Children at JoyCation event with Baroda Youth Federation volunteers" },
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
    title: "Annual Notebook Distribution Drive 2026",
    date: "2026-07-15",
    location: "Vadodara — 15 schools across Waghodia, Fatehgunj & Sayajigunj",
    description: "Distribution of 50,000+ notebooks and complete stationery kits to underprivileged students before the academic year begins. Volunteer teams will visit government schools and community centers.",
    image: IMG.pNotebooks,
    upcoming: true,
  },
  {
    title: "Independence Day Celebration",
    date: "2026-08-15",
    location: "Government Primary School, Waghodia & Atladara",
    description: "Flag hoisting ceremony, patriotic songs, sweets distribution and educational activities for 600+ children from nearby slums. Volunteers will conduct sessions on freedom fighters and national pride.",
    image: IMG.flag,
    upcoming: true,
  },
  {
    title: "Winter Blanket Drive 2026",
    date: "2026-12-20",
    location: "Sayajigunj, Old City, Railway Station & Bus Stand areas",
    description: "Night distribution of 2,000 warm blankets to homeless families, daily-wage workers and elderly citizens sleeping on the streets. Teams will conduct rounds from 10 PM to 2 AM.",
    image: IMG.blanket,
    upcoming: true,
  },
  {
    title: "JoyCation #13 — Science Center Visit",
    date: "2026-05-10",
    location: "Science Center, Vadodara",
    description: "Educational trip for 100 children to the Science Center with interactive exhibits, planetarium show, science experiments and lunch. Transportation and snacks provided.",
    image: IMG.joycation1,
    upcoming: false,
  },
  {
    title: "Diwali Celebration 2025",
    date: "2025-11-01",
    location: "Atladara Community Center & Waghodia Village School",
    description: "Diya lighting, rangoli making, sweets distribution, sparklers and a hot festive meal for 250 children from slum areas. Each child received a Diwali gift hamper.",
    image: IMG.diwali3,
    upcoming: false,
  },
  {
    title: "Holi Colour Drive 2025",
    date: "2025-03-14",
    location: "Waghodia Village & Tandalja Slum Area",
    description: "Safe organic colors, water play, music, dance and traditional gujiya lunch for 350+ children. Safety measures ensured with separate areas for different age groups.",
    image: IMG.holi2,
    upcoming: false,
  },
  {
    title: "JoyCation #12 — Sayaji Baug Zoo",
    date: "2025-02-20",
    location: "Sayaji Baug Zoo & Museum, Vadodara",
    description: "Day excursion for 90 children including zoo tour, museum visit, games session and nutritious lunch. First zoo visit for most participating children.",
    image: IMG.joycation1,
    upcoming: false,
  },
  {
    title: "Republic Day Flag Distribution",
    date: "2026-01-26",
    location: "5 Government Schools in Vadodara",
    description: "Distribution of national flags, patriotic badges and sweets to 800 students. Cultural performances and speeches on the Constitution.",
    image: IMG.flag,
    upcoming: true,
  },
  {
    title: "Roti Bank Special Night Drive",
    date: "2026-01-15",
    location: "Railway Station, Bus Stand & Market Areas",
    description: "Special winter night distribution serving hot meals and warm clothing to 500 homeless individuals. Extra blankets and sweaters distributed.",
    image: IMG.pRotibank,
    upcoming: true,
  },
];

export const BLOG = [
  {
    slug: "nine-years-of-baroda-youth-federation",
    title: "Nine years, 450 volunteers: How Baroda Youth Federation built a movement",
    excerpt: "From 8 students in 2017 to a city-wide federation — the journey of grassroots change in Vadodara.",
    category: "Success Stories",
    date: "2026-06-15",
    image: IMG.flag,
    read: "8 min",
  },
  {
    slug: "six-years-of-roti-bank",
    title: "Six years, 3.5 lakh meals — what Roti Bank taught us about hunger",
    excerpt: "How a small evening idea in 2019 grew into a nightly operation serving over 1,400 meals a week across Vadodara.",
    category: "Success Stories",
    date: "2025-12-20",
    image: IMG.pRotibank,
    read: "7 min",
  },
  {
    slug: "diwali-2025-celebration",
    title: "Diwali with 250 kids who had never lit a sparkler",
    excerpt: "What an evening of diyas, rangoli, laddoos and fireworks looked like through their eyes at Atladara Community Center.",
    category: "Activities",
    date: "2025-11-05",
    image: IMG.diwali3,
    read: "5 min",
  },
  {
    slug: "vadodara-flood-response-2024",
    title: "Inside the 28-day Vadodara flood response: 61,000 lives touched",
    excerpt: "How 450 volunteers mobilized overnight to reach flood-affected families with food, water and medicine across the city.",
    category: "Community Impact",
    date: "2024-09-25",
    image: IMG.heroFlood,
    read: "9 min",
  },
  {
    slug: "volunteer-stories-six-years",
    title: "I came for a Sunday and stayed six years",
    excerpt: "A long-time Baroda Youth Federation volunteer on what really keeps her coming back every weekend since 2019.",
    category: "Volunteer Experiences",
    date: "2025-08-10",
    image: IMG.joycation1,
    read: "6 min",
  },
  {
    slug: "menstrual-health-program-impact",
    title: "22,000 girls later: Designing a menstrual-health program that works",
    excerpt: "What we learned from 60 schools, thousands of conversations, and building trust with adolescent girls across Vadodara.",
    category: "Community Impact",
    date: "2025-07-15",
    image: IMG.pSanitary,
    read: "8 min",
  },
  {
    slug: "blanket-drive-2024-impact",
    title: "10,000 blankets later — the math of warmth in Vadodara winters",
    excerpt: "How we plan, source and distribute blankets without a single rupee of overhead, reaching those who need it most.",
    category: "Success Stories",
    date: "2025-02-15",
    image: IMG.blanket,
    read: "6 min",
  },
  {
    slug: "project-sankalp-2025",
    title: "50,000 notebooks: The story behind Project Sankalp's 2025 distribution",
    excerpt: "From 8,000 books in 2018 to 50,000+ in 2025 — the growth of our flagship education initiative across 180 schools.",
    category: "Success Stories",
    date: "2025-07-20",
    image: IMG.pNotebooks,
    read: "7 min",
  },
  {
    slug: "joycation-science-center-trip",
    title: "First time at a planetarium: JoyCation #13 sparks curiosity",
    excerpt: "Taking 100 children to the Science Center — watching eyes light up at interactive exhibits and their first planetarium show.",
    category: "Activities",
    date: "2026-05-15",
    image: IMG.joycation1,
    read: "5 min",
  },
  {
    slug: "holi-2025-colour-drive",
    title: "Safe Holi, Happy Holi: 350 children celebrate with organic colors",
    excerpt: "How we organized a safe, inclusive Holi celebration in Waghodia Village with proper safety measures and traditional festivities.",
    category: "Activities",
    date: "2025-03-20",
    image: IMG.holi2,
    read: "4 min",
  },
];

export const PARTNERS = [
  "L&T", "Reliance Foundation", "Tata Trusts", "Adani Foundation",
  "HDFC Parivartan", "Infosys Foundation", "Axis Bank Foundation", "ICICI Foundation",
];

export type DonationFund = {
  slug: string;
  title: string;
  desc: string;
  raised: number;
  goal: number;
  accent: "primary" | "secondary" | "accent";
};

export const DONATION_FUNDS: DonationFund[] = [
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
    desc: "Lets Baroda Youth Federation send help where it's needed most — Roti Bank, blankets, festivals and more.",
    raised: 4_60_000,
    goal: 10_00_000,
    accent: "primary",
  },
];
