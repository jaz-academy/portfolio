export default function Loading() {
  return (
    <main
      aria-label="Loading portfolio"
      className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-24 text-white"
    >
      <div className="w-full max-w-2xl space-y-6" aria-live="polite">
        <span className="sr-only">Loading portfolio...</span>
        <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-16 w-full max-w-xl animate-pulse rounded bg-white/10" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 pt-8 sm:grid-cols-3">
          <div className="h-32 animate-pulse rounded-lg bg-white/10" />
          <div className="h-32 animate-pulse rounded-lg bg-white/10" />
          <div className="h-32 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>
    </main>
  );
}
