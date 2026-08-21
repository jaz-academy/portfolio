'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Format JSON ke string untuk diedit di Textarea
  const [summariesStr, setSummariesStr] = useState(JSON.stringify(initialData.summaries || [], null, 2))
  const [statsStr, setStatsStr] = useState(JSON.stringify(initialData.stats || [], null, 2))
  const [socialStr, setSocialStr] = useState(JSON.stringify(initialData.socialLinks || [], null, 2))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const payload = {
        name: formData.get('name'),
        role: formData.get('role'),
        location: formData.get('location'),
        email: formData.get('email'),
        whatsapp: formData.get('whatsapp'),
        link_cv: formData.get('link_cv'),
        short_bio: formData.get('short_bio'),
        long_bio: formData.get('long_bio'),
        availability: formData.get('availability'),
        skill: formData.get('skill'),
        summaries: JSON.parse(summariesStr),
        stats: JSON.parse(statsStr),
        social_links: JSON.parse(socialStr)
      }

      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        alert('Profile berhasil diupdate!')
        router.refresh()
      } else {
        const err = await res.json()
        alert('Error: ' + (err.error || 'Gagal menyimpan data'))
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        alert('Format JSON tidak valid! Pastikan tanda kutip dan koma sudah benar.')
      } else {
        console.error(error)
        alert('Terjadi kesalahan sistem.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-gray-800 p-8 rounded-xl ring-1 ring-white/10">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Nama</label>
          <input required type="text" name="name" defaultValue={initialData?.name} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Role</label>
          <input required type="text" name="role" defaultValue={initialData?.role} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Email</label>
          <input required type="email" name="email" defaultValue={initialData?.email} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Location</label>
          <input required type="text" name="location" defaultValue={initialData?.location} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">WhatsApp Link</label>
          <input required type="url" name="whatsapp" defaultValue={initialData?.whatsapp} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">CV Link</label>
          <input required type="url" name="link_cv" defaultValue={initialData?.linkCv} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Short Bio</label>
        <textarea required name="short_bio" rows={2} defaultValue={initialData?.shortBio} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Long Bio</label>
        <textarea required name="long_bio" rows={4} defaultValue={initialData?.longBio} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">Skill Summary</label>
        <textarea required name="skill" rows={3} defaultValue={initialData?.skill} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
      </div>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Availability</label>
          <select name="availability" defaultValue={initialData?.availability} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm [&>option]:bg-gray-800">
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-6">
        <h3 className="text-lg font-medium text-white">Data Lanjutan (JSON Format)</h3>
        <p className="text-sm text-gray-400">Edit array JSON di bawah ini untuk mengubah data. Pastikan format valid.</p>
        
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Feature Summaries</label>
          <textarea rows={6} value={summariesStr} onChange={(e) => setSummariesStr(e.target.value)} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 font-mono text-xs" />
        </div>
        
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Stats</label>
          <textarea rows={6} value={statsStr} onChange={(e) => setStatsStr(e.target.value)} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 font-mono text-xs" />
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">Social Links</label>
          <textarea rows={6} value={socialStr} onChange={(e) => setSocialStr(e.target.value)} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 font-mono text-xs" />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Profile'}
        </button>
      </div>
    </form>
  )
}
