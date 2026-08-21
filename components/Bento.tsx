import ProjectImageCard from "@/components/ProjectImageCard";

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store' // Agar selalu mendapatkan data terbaru
    });
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch projects', error);
    return [];
  }
}

export default async function Bento() {
  const rawProjects = await getProjects();
  
  // Format data dari database (snake_case) ke format UI (camelCase)
  const projects = rawProjects.map((p: { id: number, title: string, description: string, image: string, featured: boolean, year: number, image_alt: string, categories?: { name: string } }) => ({
    ...p,
    imageAlt: p.image_alt,
    category: p.categories?.name || 'Uncategorized',
  }));

  const galleryProjects = [
    ...projects.filter((project: { id: number, title: string, description: string, image: string, categories?: { name: string } }) => project.featured),
    ...projects.filter((project: { id: number, title: string, description: string, image: string, categories?: { name: string } }) => !project.featured),
  ];
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-400">
          Selected work
        </h2>
        <h2
          id="projects-heading"
          className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
        >
          Recent projects and content experiments
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {galleryProjects.map((project, index) => (
            <ProjectImageCard
              key={project.id}
              project={project}
              className={
                index === 0
                  ? "lg:row-span-2 lg:rounded-l-4xl"
                  : index === 1
                    ? "max-lg:row-start-1"
                    : index === 2
                      ? "max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
                      : "lg:row-span-2 lg:rounded-r-4xl"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
