"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      role="alert"
      className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-24 text-white"
    >
      <section className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          The portfolio could not be loaded.
        </h1>
        <p className="mt-4 text-gray-300">
          Please try again. If the problem continues, return to the homepage
          and refresh the page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
