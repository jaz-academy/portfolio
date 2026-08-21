import ProfileForm from '@/components/ProfileForm'
import { getProfileData } from '@/utils/api'

export default async function AdminProfilePage() {
  const profile = await getProfileData()

  if (!profile) {
    return <div className="text-white">Gagal memuat profil. Pastikan data sudah terisi di database.</div>
  }

  return (
    <div className="text-white">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-white">My Profile</h1>
          <p className="mt-2 text-sm text-gray-400">
            Perbarui data diri, biografi, sosial media, dan keahlian Anda di sini.
          </p>
        </div>
      </div>

      <ProfileForm initialData={profile} />
    </div>
  )
}
