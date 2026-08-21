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
          <figure className="group relative min-h-80 overflow-hidden rounded-lg lg:row-span-2 lg:rounded-l-4xl">
            <img
              alt="Lifestyle brand campaign being filmed outdoors"
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=2000&q=90"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/15"
            />
          </figure>
          <figure className="group relative min-h-80 overflow-hidden rounded-lg max-lg:row-start-1">
            <img
              alt="Video editing timeline on a laptop"
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1800&q=90"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/15"
            />
          </figure>
          <figure className="group relative min-h-80 overflow-hidden rounded-lg max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <img
              alt="Creator recording a social media video"
              src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1800&q=90"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/15"
            />
          </figure>
          <figure className="group relative min-h-80 overflow-hidden rounded-lg lg:row-span-2 lg:rounded-r-4xl">
            <img
              alt="Camera and creative equipment ready for a shoot"
              src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2000&q=90"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/15"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
