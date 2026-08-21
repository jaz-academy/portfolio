import type { ComponentType } from "react";

export type ProjectCategory =
  | "video"
  | "social-media"
  | "branding"
  | "photography";

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  year: number;
  featured?: boolean;
}

export interface Learning {
  id: number;
  name: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface Education {
  id: number;
  institution: string;
  program: string;
  description: string;
  status: "completed" | "ongoing";
}

export interface SocialLink {
  id: number;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  href: string;
  description?: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  whatsapp: string;
  linkCv: string;
  shortBio: string;
  longBio: string;
  availability: "available" | "busy" | "unavailable";
  summaries: {
    name: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
  }[];
  stats: {
    id: number;
    name: string;
    value: string;
  }[];
  skill: string;
}
