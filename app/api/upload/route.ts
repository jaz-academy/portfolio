import { NextResponse } from 'next/server';
import { uploadFileToDrive } from '@/lib/google-drive';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileId = await uploadFileToDrive(file);

    return NextResponse.json({ id: fileId, url: `/api/drive/${fileId}` }, { status: 200 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}
