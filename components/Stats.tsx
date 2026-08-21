const stats = [
  { id: 1, name: "Personal clients", value: "18+" },
  { id: 2, name: "Companies collaborated with", value: "9" },
  { id: 3, name: "Creative partners", value: "24" },
];

export default function Stats() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 id="experience-heading" className="sr-only">
          Collaboration highlights
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base/7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
