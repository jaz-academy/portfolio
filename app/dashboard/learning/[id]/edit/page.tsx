import LearningForm from '@/components/LearningForm'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

async function getLearning(id: string) {
  const { data } = await supabase.from('learning').select('*').eq('id', id).single()
  return data
}

export default async function EditLearningPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await getLearning(id)

  if (!item) {
    notFound()
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold leading-6 mb-8 text-white">Edit Learning</h1>
      <LearningForm initialData={item} />
    </div>
  )
}
