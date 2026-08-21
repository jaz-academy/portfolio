import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'

async function getLearning() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/learning`, {
      cache: 'no-store'
    });
    if (!res.ok) return []
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AdminLearningPage() {
  const learningList = await getLearning();

  return (
    <div className="text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-white">Learning & Education</h1>
          <p className="mt-2 text-sm text-gray-400">
            Kelola daftar edukasi/kursus yang tampil di halaman portfolio utama Anda.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/learning/create"
            className="flex items-center gap-2 block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Learning
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
                      Judul
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Deskripsi
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Aksi</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-gray-900">
                  {learningList.map((item: any) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        {item.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-400 max-w-md truncate">
                        {item.description}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/dashboard/learning/${item.id}/edit`}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="Edit"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Link>
                          <DeleteButton id={item.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {learningList.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-sm text-gray-400">
                        Belum ada data.
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
