import { getLearningData } from "@/utils/api";

import InteractiveSkillCard from "@/components/InteractiveSkillCard";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Centered() {
  const learning = await getLearningData();
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base/7 font-semibold text-indigo-400">
              Education & Learning
            </p>
            <h2
              id="skills-heading"
              className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance"
            >
              Skills and Practices
            </h2>
            <p className="mt-6 text-lg/8 text-gray-300">
              I used to learn through the internet, joining courses and
              communities for building a practical visual communication and
              sharpening my skills.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-4">
            {learning.map(
              (
                feature: {
                  name: string;
                  description: string;
                  icon_name: string;
                },
                index: number,
              ) => {
                return (
                  <InteractiveSkillCard
                    key={feature.name}
                    feature={feature}
                    index={index}
                  />
                );
              },
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
