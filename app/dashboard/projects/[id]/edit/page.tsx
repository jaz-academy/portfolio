import ProjectForm from '@/components/ProjectForm'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('id')
  return data || []
}

async function getProject(id: string) {
  const { data } = await supabase.from('projects').select('*').eq('id', id).single()
  return data
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [categories, project] = await Promise.all([
    getCategories(),
    getProject(id)
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold leading-6 mb-8 text-white">Edit Project</h1>
      <ProjectForm initialData={project} categories={categories} />
    </div>
  )
}
