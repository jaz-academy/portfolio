import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { deleteFileFromDrive } from '@/lib/google-drive';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
    }

    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        categories (
          slug,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }

    return NextResponse.json({ data: project }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // Check existing image to delete if it has changed
    if (body.image || body.video !== undefined) {
      const { data: existingProject } = await supabase
        .from('projects')
        .select('image, video')
        .eq('id', id)
        .single();

      if (existingProject) {
        if (body.image !== undefined && existingProject.image && existingProject.image !== body.image) {
          const oldImages = existingProject.image.split(',').map((u: string) => u.trim());
          const newImages = body.image ? body.image.split(',').map((u: string) => u.trim()) : [];
          const imagesToDelete = oldImages.filter((img: string) => !newImages.includes(img) && img.startsWith('/api/drive/'));
          
          for (const img of imagesToDelete) {
            const fileId = img.split('/api/drive/')[1];
            if (fileId) {
              await deleteFileFromDrive(fileId);
            }
          }
        }
        
        if (body.video !== undefined && existingProject.video && existingProject.video !== body.video) {
          if (existingProject.video.startsWith('/api/drive/')) {
            const fileId = existingProject.video.split('/api/drive/')[1];
            if (fileId) {
              await deleteFileFromDrive(fileId);
            }
          }
        }
      }
    }

    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }

    return NextResponse.json({ data: updatedProject }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // Get existing image to delete from drive
    const { data: existingProject } = await supabase
      .from('projects')
      .select('image, video')
      .eq('id', id)
      .single();

    if (existingProject) {
      if (existingProject.image) {
        const imagesToDelete = existingProject.image.split(',').map((u: string) => u.trim()).filter((img: string) => img.startsWith('/api/drive/'));
        for (const img of imagesToDelete) {
          const fileId = img.split('/api/drive/')[1];
          if (fileId) {
            await deleteFileFromDrive(fileId);
          }
        }
      }
      
      if (existingProject.video && existingProject.video.startsWith('/api/drive/')) {
        const fileId = existingProject.video.split('/api/drive/')[1];
        if (fileId) {
          await deleteFileFromDrive(fileId);
        }
      }
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
