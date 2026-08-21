import ProjectImageCard from "@/components/ProjectImageCard";
import { getFeaturedProjects, projects } from "@/data/portfolio";

const galleryProjects = [
  ...getFeaturedProjects(projects),
  ...projects.filter((project) => !project.featured),
];

export default function Bento() {
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
