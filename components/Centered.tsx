import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Jaz Academy Multimedia",
    description:
      "Pelatihan Multimedia & Content Creator dengan fokus pada produksi video, fotografi dasar, dan komunikasi visual.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Udemy • CapCut & Premiere Pro",
    description:
      "Kursus editing yang melatih cutting, audio mixing, color correction, caption, dan format video untuk berbagai platform.",
    icon: LockClosedIcon,
  },
  {
    name: "MCC • Content strategy course",
    description:
      "Belajar menyusun content pillar, membuat kalender konten, membaca insight, dan mengembangkan ide yang konsisten.",
    icon: ArrowPathIcon,
  },
  {
    name: "Jazmedia • Visual storytelling",
    description:
      "Mempraktikkan dasar scriptwriting, shot composition, camera movement, dan storytelling untuk video pendek.",
    icon: FingerPrintIcon,
  },
];

export default function Centered() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base/7 font-semibold text-indigo-400">
            Education & learning
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance"
          >
            Skills built through school and practice
          </h2>
          <p className="mt-6 text-lg/8 text-gray-300">
            I am currently a multimedia student, building a practical foundation
            in visual communication while sharpening my craft through courses,
            personal projects, and collaborative productions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
