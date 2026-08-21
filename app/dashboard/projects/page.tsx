import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store'
    });
    if (!res.ok) return []
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch projects', error);
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-white">Projects</h1>
          <p className="mt-2 text-sm text-gray-400">
            Kelola daftar project yang tampil di halaman portfolio utama Anda.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/projects/create"
            className="flex items-center gap-2 block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Project
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-white/10 sm:rounded-lg">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Judul Project
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Kategori
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Tahun
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Featured
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Aksi</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-gray-900">
                  {projects.map((project: { id: number, title: string, category_id: number, featured: boolean, categories?: { name: string } }) => (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        {project.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                        {project.categories?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                        {project.year}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                        {project.featured ? (
                          <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                            No
                          </span>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/dashboard/projects/${project.id}/edit`}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="Edit Project"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Link>
                          <DeleteButton id={project.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                        Belum ada data project.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
