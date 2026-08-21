import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
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
];

export default function Feature() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="overflow-hidden bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-400">
                About me
              </p>
              <h2
                id="about-heading"
                className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
              >
                Stories with a point of view
              </h2>
              <p className="mt-6 text-lg/8 text-gray-300">
                As a content creator and video editor, I collaborate from the
                first idea to the final upload. My work combines visual
                storytelling, intentional editing, and a practical understanding
                of how people discover content online.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-400"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Video editor working with a camera and laptop"
            src="https://media.istockphoto.com/id/1434250824/id/foto/pemuda-mengedit-video-di-kantor-pusat.jpg?s=1024x1024&w=is&k=20&c=nSEcO_8XAbUqZA4wu3UQUJIPc6lCsJ8zvwrnf1LoJ-M="
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
          />
        </div>
      </div>
    </section>
  );
}
