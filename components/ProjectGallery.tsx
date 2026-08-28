"use client";

import { useState } from "react";
import ProjectImageCard from "@/components/ProjectImageCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ProjectGalleryProps {
  initialProjects: any[]; // Menggunakan any[] secara sementara untuk mempercepat, idealnya gunakan interface Project
}

export default function ProjectGallery({ initialProjects }: ProjectGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(query);
    const categoryMatch = project.category?.toLowerCase().includes(query) ?? false;
    return titleMatch || categoryMatch;
  });

  return (
    <>
      <div className="mx-auto mt-8 max-w-lg">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-4 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            let layoutClass = "";
            if (index === 0) {
              layoutClass = "lg:row-span-2 lg:rounded-l-4xl";
            } else if (index === 1) {
              layoutClass = "max-lg:row-start-1 lg:col-start-2 lg:row-start-1";
            } else if (index === 2) {
              layoutClass = "max-lg:row-start-3 lg:col-start-2 lg:row-start-2";
            } else if (index === 3) {
              layoutClass = "lg:col-start-3 lg:row-start-1 lg:rounded-tr-4xl";
            } else if (index === 4) {
              layoutClass = "lg:col-start-3 lg:row-start-2 lg:rounded-br-4xl";
            } else {
              layoutClass = "rounded-lg"; // default fallback if more than 5
            }

            return (
              <ProjectImageCard
                key={project.id}
                project={project}
                className={layoutClass}
              />
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            No projects found matching "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
}
