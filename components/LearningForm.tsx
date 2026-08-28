'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import IconPicker from './IconPicker'

export default function LearningForm({ initialData }: { initialData?: { id: number; name: string; description: string; icon_name: string } }) {
  const router = useRouter()
  const isEdit = !!initialData
  const [loading, setLoading] = useState(false)
  const [iconName, setIconName] = useState(initialData?.icon_name || 'AcademicCapIcon')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      description: formData.get('description'),
      icon_name: formData.get('icon_name'),
    }

    try {
      const url = isEdit ? `/api/learning/${initialData.id}` : '/api/learning'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        router.push('/dashboard/learning')
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
        <label className="block text-sm font-medium leading-6 text-gray-300">Nama / Judul Edukasi</label>
        <input
          required
          type="text"
          name="name"
          defaultValue={initialData?.name}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Deskripsi</label>
        <textarea
          required
          name="description"
          rows={3}
          defaultValue={initialData?.description}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Ikon Edukasi</label>
        <div className="mt-2 w-64">
          <IconPicker value={iconName} onChange={setIconName} />
          <input type="hidden" name="icon_name" value={iconName} />
        </div>
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
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}
