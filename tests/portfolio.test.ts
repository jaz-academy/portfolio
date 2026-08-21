import { describe, expect, it } from "vitest";
import { getFeaturedProjects, learning, projects, profile } from "@/data/portfolio";

const testProjects = [
  { ...projects[0], featured: true },
  { ...projects[1], featured: false },
  { ...projects[2], featured: true },
];

describe("getFeaturedProjects", () => {
  it("returns only featured projects", () => {
    const featuredProjects = getFeaturedProjects(testProjects);

    expect(featuredProjects).toHaveLength(2);
    expect(featuredProjects.every((project) => project.featured)).toBe(true);
    expect(featuredProjects.map((project) => project.id)).toEqual([1, 3]);
  });

  it("returns an empty array when no project is featured", () => {
    const unfeaturedProjects = testProjects.map((project) => ({
      ...project,
      featured: false,
    }));

    expect(getFeaturedProjects(unfeaturedProjects)).toEqual([]);
  });

  it("does not mutate the source array", () => {
    const originalProjects = [...testProjects];

    getFeaturedProjects(testProjects);

    expect(testProjects).toEqual(originalProjects);
  });
});

describe("portfolio data", () => {
  it("contains uniquely identified projects", () => {
    const projectIds = projects.map((project) => project.id);

    expect(new Set(projectIds).size).toBe(projectIds.length);
  });

  it("contains learning items with names and descriptions", () => {
    expect(learning.length).toBeGreaterThan(0);
    expect(learning.every((item) => item.name && item.description)).toBe(true);
  });

  it("contains the required profile contact fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(profile.location).toBeTruthy();
  });
});
