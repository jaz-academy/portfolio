import ProjectGallery from "@/components/ProjectGallery";
import ScrollReveal from "@/components/ScrollReveal";

async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/projects`,
      {
        cache: "no-store", // Agar selalu mendapatkan data terbaru
      },
    );
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return [];
  }
}

export default async function Bento() {
  const rawProjects = await getProjects();

  // Format data dari database (snake_case) ke format UI (camelCase)
  const projects = rawProjects.map(
    (p: {
      id: number;
      title: string;
      description: string;
      image: string;
      featured: boolean;
      year: number;
      image_alt: string;
      categories?: { name: string };
    }) => ({
      ...p,
      imageAlt: p.image_alt,
      category: p.categories?.name || "Uncategorized",
    }),
  );

  const galleryProjects = [
    ...projects.filter(
      (project: {
        id: number;
        title: string;
        description: string;
        image: string;
        featured: boolean;
        categories?: { name: string };
      }) => project.featured,
    ),
    ...projects.filter(
      (project: {
        id: number;
        title: string;
        description: string;
        image: string;
        featured: boolean;
        categories?: { name: string };
      }) => !project.featured,
    ),
  ];
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <ScrollReveal direction="down">
          <h2 className="text-center text-base/7 font-semibold text-indigo-400">
            Selected Work
          </h2>
          <h2
            id="projects-heading"
            className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
          >
            Recent Projects
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <ProjectGallery initialProjects={galleryProjects} />
        </ScrollReveal>
      </div>
    </section>
  );
}
