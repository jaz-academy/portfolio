import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FilmIcon,
  ServerIcon,
  LockClosedIcon,
  CameraIcon,
  PlayIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

import type { Learning, Profile, Project, SocialLink } from "@/types/portfolio";

export const profile: Profile = {
  name: "Gilang Raka Aditya",
  role: "Content Creator & Video Editor",
  location: "Jakarta, Indonesia",
  email: "hello@rakaaditya.com",
  whatsapp: "https://wa.me/6281234567890",
  linkCv:
    "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing",
  shortBio:
    "I turn ideas, stories, and everyday moments into sharp visual content for brands, communities, and personal projects.",
  longBio:
    "As a content creator and video editor, I work from the first idea to the final upload. My work combines visual storytelling, intentional editing, and a practical understanding of how people discover content online.",
  availability: "available",
  summaries: [
    {
      name: "Creative direction",
      description:
        "I develop visual concepts, moodboards, and content plans that give every story a clear point of view.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "Video editing",
      description:
        "From rough cut to final export, I edit short-form and long-form videos with rhythm, pacing, sound, and captions in mind.",
      icon: LockClosedIcon,
    },
    {
      name: "Social content",
      description:
        "I create platform-ready reels, carousels, and behind-the-scenes content that feels native to each audience.",
      icon: ServerIcon,
    },
  ],
  stats: [
    { id: 1, name: "Personal clients", value: "18+" },
    { id: 2, name: "Collaborated with", value: "12" },
    { id: 3, name: "Creative partners", value: "24" },
  ],
  skill:
    "I am currently a multimedia student, building a practical foundation in visual communication while sharpening my craft through courses, personal projects, and collaborative productions.",
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Lifestyle Brand Campaign",
    description:
      "Campaign visual dengan short-form video dan social media assets.",
    category: "branding",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=90",
    imageAlt: "Lifestyle brand campaign being filmed outdoors",
    year: 2025,
    featured: true,
  },
  {
    id: 2,
    title: "Behind the Edit",
    description:
      "Eksperimen video yang menampilkan proses editing dan sound design.",
    category: "video",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=90",
    imageAlt: "Video editing timeline on a laptop",
    year: 2025,
    featured: true,
  },
  {
    id: 3,
    title: "Weekly Social Series",
    description:
      "Serial konten visual untuk membangun konsistensi brand di media sosial.",
    category: "social-media",
    image:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1600&q=90",
    imageAlt: "Creator recording a social media video",
    year: 2024,
  },
  {
    id: 4,
    title: "Creative Equipment Shoot",
    description:
      "Pemotretan peralatan kreatif untuk dokumentasi dan promosi produksi.",
    category: "photography",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1600&q=90",
    imageAlt: "Camera and creative equipment ready for a shoot",
    year: 2024,
  },
];

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured === true);
}

export const learning: Learning[] = [
  {
    id: 1,
    name: "Jaz Academy Multimedia",
    description:
      "Pelatihan Multimedia & Content Creator dengan fokus pada produksi video, fotografi dasar, dan komunikasi visual.",
    icon: CloudArrowUpIcon,
  },
  {
    id: 2,
    name: "Udemy • CapCut & Premiere Pro",
    description:
      "Kursus editing yang melatih cutting, audio mixing, color correction, caption, dan format video untuk berbagai platform.",
    icon: LockClosedIcon,
  },
  {
    id: 3,
    name: "MCC • Content strategy course",
    description:
      "Belajar menyusun content pillar, membuat kalender konten, membaca insight, dan mengembangkan ide yang konsisten.",
    icon: ArrowPathIcon,
  },
  {
    id: 4,
    name: "Jazmedia • Visual storytelling",
    description:
      "Mempraktikkan dasar scriptwriting, shot composition, camera movement, dan storytelling untuk video pendek.",
    icon: FilmIcon,
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    label: "LinkedIn",
    icon: PresentationChartBarIcon,
    href: "https://www.linkedin.com",
    description: "Connect Professionally",
  },
  {
    id: 2,
    label: "Instagram",
    icon: CameraIcon,
    href: "https://www.instagram.com",
    description: "Behind The Scenes",
  },
  {
    id: 4,
    label: "YouTube",
    icon: PlayIcon,
    href: "https://www.youtube.com",
    description: "Subscribe my channel",
  },
];
