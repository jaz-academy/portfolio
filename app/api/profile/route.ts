import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { deleteFileFromDrive } from '@/lib/google-drive';

export async function GET() {
  try {
    const supabase = await createClient();
    // Profile is always id 1
    const { data: profile, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: profile }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    if (body.image || body.link_cv) {
      const { data: existingProfile } = await supabase
        .from('profile')
        .select('image, link_cv')
        .eq('id', 1)
        .single();

      if (existingProfile) {
        if (body.image && existingProfile.image && existingProfile.image !== body.image) {
          if (existingProfile.image.startsWith('/api/drive/')) {
            const fileId = existingProfile.image.split('/api/drive/')[1];
            if (fileId) {
              await deleteFileFromDrive(fileId);
            }
          }
        }
        
        if (body.link_cv && existingProfile.link_cv && existingProfile.link_cv !== body.link_cv) {
          if (existingProfile.link_cv.startsWith('/api/drive/')) {
            const fileId = existingProfile.link_cv.split('/api/drive/')[1];
            if (fileId) {
              await deleteFileFromDrive(fileId);
            }
          }
        }
      }
    }

    const { data, error } = await supabase
      .from('profile')
      .update(body)
      .eq('id', 1)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
