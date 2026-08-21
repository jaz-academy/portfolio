'use client'

import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function DeleteLearningButton({ id }: { id: string | number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return

    try {
      const res = await fetch(`/api/learning/${id}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else alert('Gagal menghapus data.')
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan sistem.')
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-300">
      <TrashIcon className="h-5 w-5" />
    </button>
  )
}
