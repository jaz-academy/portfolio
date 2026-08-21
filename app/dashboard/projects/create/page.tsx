import ProjectForm from '@/components/ProjectForm'
import { supabase } from '@/lib/supabase'

async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('id')
  return data || []
}

export default async function CreateProjectPage() {
  const categories = await getCategories()

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold leading-6 mb-8 text-white">Add New Project</h1>
      <ProjectForm categories={categories} />
    </div>
  )
}
