import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProject(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data) return null;
    
    // Map snake_case ke camelCase
    return {
      ...json.data,
      imageAlt: json.data.image_alt,
      category: json.data.categories?.name || 'Uncategorized'
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 px-6 py-32 text-white">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/#projects"
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
        >
          &larr; Back to projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
            {project.category}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            {project.description}
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Project year: {project.year}
          </p>
        </header>

        <figure className="mt-12 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
<img
            src={project.image}
            alt={project.imageAlt}
            className="h-auto max-h-[70vh] w-full object-cover"
          />
          <figcaption className="sr-only">{project.imageAlt}</figcaption>
        </figure>

        <footer className="mt-12">
          <Link
            href="/#contact"
            className="inline-flex rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Discuss a similar project
          </Link>
        </footer>
      </article>
    </main>
  );
}
