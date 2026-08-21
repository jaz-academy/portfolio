import type { Project } from "@/types/portfolio";
import Link from "next/link";

interface ProjectImageCardProps {
  project: Project;
  className: string;
}

export default function ProjectImageCard({
  project,
  className,
}: ProjectImageCardProps) {
  return (
    <figure
      className={`group relative min-h-80 overflow-hidden rounded-lg ${className}`}
    >
      <Link href={`/projects/${project.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
<img
          src={project.image}
          alt={project.imageAlt}
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/15"
      />
    </figure>
  );
}
