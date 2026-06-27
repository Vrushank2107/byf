// Lightweight localStorage-backed store for the admin panel.
// Persists admin CRUD + public form submissions so the admin sees real data.
// All keys are namespaced under `byf_*`.

import { useEffect, useState } from "react";
import { PROJECTS, GALLERY, EVENTS, BLOG, ORG, type Project } from "./site-data";

export const STORAGE_KEYS = {
  projects: "byf_projects",
  gallery: "byf_gallery",
  events: "byf_events",
  blog: "byf_blog",
  volunteers: "byf_volunteers",
  messages: "byf_messages",
  settings: "byf_settings",
} as const;

export type GalleryItem = { src: string; tag: string; alt: string };
export type EventItem = {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  upcoming: boolean;
};
export type BlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  read: string;
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
export type SiteSettings = {
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
};

export const DEFAULT_SETTINGS: SiteSettings = {
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
};

const EVENT_NAME = "byf_admin_store_change";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { key } }));
}

/** React hook: persistent state keyed in localStorage, syncs across components. */
export function usePersistentState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() => load(key, fallback));

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === key) setState(load(key, fallback));
    };
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", () => setState(load(key, fallback)));
    return () => window.removeEventListener(EVENT_NAME, handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = (next: T | ((prev: T) => T)) => {
    setState((prev) => {
      const value = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      save(key, value);
      return value;
    });
  };

  return [state, update] as const;
}

// Seed defaults from site-data on first read so admin views are populated.
export const useProjectsStore = () =>
  usePersistentState<Project[]>(STORAGE_KEYS.projects, PROJECTS);
export const useGalleryStore = () =>
  usePersistentState<GalleryItem[]>(STORAGE_KEYS.gallery, [...GALLERY]);
export const useEventsStore = () =>
  usePersistentState<EventItem[]>(STORAGE_KEYS.events, EVENTS);
export const useBlogStore = () =>
  usePersistentState<BlogItem[]>(STORAGE_KEYS.blog, BLOG);
export const useVolunteersStore = () =>
  usePersistentState<VolunteerSubmission[]>(STORAGE_KEYS.volunteers, []);
export const useMessagesStore = () =>
  usePersistentState<MessageSubmission[]>(STORAGE_KEYS.messages, []);
export const useSettingsStore = () =>
  usePersistentState<SiteSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS);

/** Append a volunteer submission (used by the public volunteer form). */
export function appendVolunteer(v: Omit<VolunteerSubmission, "id" | "submittedAt">) {
  const list = load<VolunteerSubmission[]>(STORAGE_KEYS.volunteers, []);
  const entry: VolunteerSubmission = {
    ...v,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  save(STORAGE_KEYS.volunteers, [entry, ...list]);
}

/** Append a contact-form message (used by the public contact form). */
export function appendMessage(m: Omit<MessageSubmission, "id" | "submittedAt" | "read">) {
  const list = load<MessageSubmission[]>(STORAGE_KEYS.messages, []);
  const entry: MessageSubmission = {
    ...m,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    read: false,
  };
  save(STORAGE_KEYS.messages, [entry, ...list]);
}

/** Convert an uploaded File into a base64 data URL for storage in localStorage. */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
