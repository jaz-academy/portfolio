import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams;
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-12 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-gray-800 p-8 shadow-xl border border-white/10">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to manage your portfolio
          </p>
        </div>
        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {params?.error && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/20">
              {params.error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              &larr; Back to website
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
