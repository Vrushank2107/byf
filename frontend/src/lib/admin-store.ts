// Backend API-based store for the admin panel.
// Uses the REST API for all CRUD operations.

import { useEffect, useState } from "react";
import { PROJECTS, GALLERY, EVENTS, BLOG, ORG, DONATION_FUNDS, type DonationFund, type Project } from "./site-data";
import { api } from "./api";

export type GalleryItem = { id?: string; src: string; tag: string; alt: string };
export type EventItem = {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  upcoming: boolean;
};
export type BlogItem = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  read: string;
  content?: string;
};
export type VolunteerSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  skills: string;
  availability: string;
  resumeName?: string;
  resumeUrl?: string;
  reviewed: boolean;
  submittedAt: string;
};
export type MessageSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
};
export type ActivityItem = {
  id?: string;
  title: string;
  tag: string;
  date: string;
  image: string;
};
export type TestimonialItem = {
  id?: string;
  name: string;
  role: string;
  quote: string;
  image: string;
};
export type ImpactStatItem = {
  id?: string;
  label: string;
  value: string;
  suffix?: string;
  color: string;
  order: number;
};
export type LeaderItem = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  order: number;
};
export type PartnerItem = {
  id?: string;
  name: string;
  order: number;
};
export type DonationItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pan?: string;
  amount: number;
  fund: string;
  status: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  receiptNumber?: string;
  receiptGenerated: boolean;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
};
export type SiteSettings = {
  id: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappName: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  founderPortfolioUrl: string;
  donationFunds: DonationFund[];
  updatedAt: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: '',
  email: ORG.email,
  phone: ORG.phone,
  whatsapp: ORG.whatsapp,
  whatsappName: ORG.whatsappName,
  address: ORG.address,
  instagram: ORG.social.instagram,
  facebook: ORG.social.facebook,
  twitter: ORG.social.twitter,
  youtube: ORG.social.youtube,
  founderPortfolioUrl: ORG.founderPortfolioUrl,
  donationFunds: DONATION_FUNDS,
  updatedAt: new Date().toISOString(),
};

// API-based hooks using React Query-like pattern
export function useProjectsStore() {
  const [data, setData] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getProjects();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useGalleryStore() {
  const [data, setData] = useState<GalleryItem[]>([...GALLERY]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getGallery();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useEventsStore() {
  const [data, setData] = useState<EventItem[]>(EVENTS);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getEvents();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useBlogStore() {
  const [data, setData] = useState<BlogItem[]>(BLOG);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getBlogPosts();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useVolunteersStore() {
  const [data, setData] = useState<VolunteerSubmission[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getVolunteers();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useMessagesStore() {
  const [data, setData] = useState<MessageSubmission[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getMessages();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useSettingsStore() {
  const [data, setData] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getSettings();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useActivitiesStore() {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getActivities();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useTestimonialsStore() {
  const [data, setData] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getTestimonials();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useImpactStatsStore() {
  const [data, setData] = useState<ImpactStatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getImpactStats();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch impact stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useLeadersStore() {
  const [data, setData] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getLeaders();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function usePartnersStore() {
  const [data, setData] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getPartners();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

export function useDonationsStore() {
  const [data, setData] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await api.getDonations();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, refresh };
}

/** Submit a volunteer form (used by the public volunteer form). */
export async function appendVolunteer(v: Omit<VolunteerSubmission, "id" | "submittedAt" | "reviewed">) {
  try {
    await api.createVolunteer(v);
  } catch (error) {
    console.error('Failed to submit volunteer:', error);
    throw error;
  }
}

/** Submit a contact form message (used by the public contact form). */
export async function appendMessage(m: Omit<MessageSubmission, "id" | "submittedAt" | "read">) {
  try {
    await api.createMessage(m);
  } catch (error) {
    console.error('Failed to submit message:', error);
    throw error;
  }
}

/** Upload image to Cloudinary via backend API. */
export async function uploadImage(file: File, folder?: string): Promise<string> {
  try {
    const result = await api.uploadImage(file, folder);
    return result.url;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
}

/** Convert a File to a data URL (for local preview/storage). */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
