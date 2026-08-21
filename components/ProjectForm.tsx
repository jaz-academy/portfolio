'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectForm({ 
  initialData, 
  categories 
}: { 
  initialData?: any
  categories: any[]
}) {
  const router = useRouter()
  const isEdit = !!initialData
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      category_id: Number(formData.get('category_id')),
      image: formData.get('image'),
      year: Number(formData.get('year')),
      featured: formData.get('featured') === 'on',
    }

    try {
      const url = isEdit ? `/api/projects/${initialData.id}` : '/api/projects'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        router.push('/dashboard/projects')
        router.refresh()
      } else {
        const err = await res.json()
        alert('Error: ' + (err.error || 'Gagal menyimpan data'))
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan sistem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-gray-800 p-8 rounded-xl ring-1 ring-white/10">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Judul Project</label>
        <input
          required
          type="text"
          name="title"
          defaultValue={initialData?.title}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Deskripsi</label>
        <textarea
          required
          name="description"
          rows={4}
          defaultValue={initialData?.description}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Kategori</label>
          <select
            name="category_id"
            defaultValue={initialData?.category_id || categories[0]?.id}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&>option]:bg-gray-800"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Tahun</label>
          <input
            required
            type="number"
            name="year"
            defaultValue={initialData?.year || new Date().getFullYear()}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">URL Gambar (Image URL)</label>
        <input
          required
          type="url"
          name="image"
          defaultValue={initialData?.image}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex items-center gap-x-3">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={initialData?.featured}
          className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900"
        />
        <label htmlFor="featured" className="text-sm leading-6 text-gray-300">
          Tampilkan sebagai Featured Project di halaman utama
        </label>
      </div>

      <div className="flex justify-end gap-x-4 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Project'}
        </button>
      </div>
    </form>
  )
}
