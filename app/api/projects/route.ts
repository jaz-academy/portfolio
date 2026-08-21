import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        categories (
          slug,
          name
        )
      `)
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Menerima data dari body request
    const { title, description, category_id, image, image_alt, year, featured } = body;

    // Validasi input sederhana
    if (!title || !description || !category_id || !image || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Melakukan operasi INSERT ke Supabase
    const { data: newProject, error } = await supabase
      .from('projects')
      .insert([
        {
          title,
          description,
          category_id,
          image,
          image_alt: image_alt || title,
          year,
          featured: featured || false,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

    // Mengembalikan data project yang baru dibuat dengan HTTP Status 201 (Created)
    return NextResponse.json({ data: newProject }, { status: 201 });
  } catch (err) {
    console.error('Server POST error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
