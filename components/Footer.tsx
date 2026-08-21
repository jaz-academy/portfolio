import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2
              id="contact-heading"
              className="text-4xl font-semibold tracking-tight text-white"
            >
              Let&apos;s make something worth watching.
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Available for freelance editing, social content, and creative
              collaborations. Reach out and tell me what you are building.
            </p>
            <address className="mt-6 flex flex-col gap-3 not-italic text-base text-gray-300">
              <a
                className="flex items-center gap-3 hover:text-white"
                href="mailto:hello@rakaaditya.com"
              >
                <EnvelopeIcon aria-hidden="true" className="size-5" />
                hello@rakaaditya.com
              </a>
              <span className="flex items-center gap-3">
                <MapPinIcon aria-hidden="true" className="size-5" />
                Jakarta, Indonesia
              </span>
            </address>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:pt-2 mt-6">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 py-2 px-4 ring-1 ring-white/10">
                <span className="text-xl text-white" aria-hidden="true">
                  in
                </span>
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                LinkedIn
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Connect professionally
                </a>
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 py-2 px-4 ring-1 ring-white/10">
                <span className="text-xl text-white" aria-hidden="true">
                  ◎
                </span>
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Instagram
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  See behind the scenes
                </a>
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 py-2 px-5 ring-1 ring-white/10">
                <span className="text-xl text-white" aria-hidden="true">
                  t
                </span>
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Tiktok
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  My Daily Life and Work
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl pt-36"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </footer>
  );
}
