import { NextResponse } from 'next/server';
import { getDriveFileStream } from '@/lib/google-drive';
import { ReadableOptions } from 'stream';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
    }

    // Menggunakan redirect ke Google Drive langsung untuk menghindari:
    // 1. Limit response size Vercel (maksimal 4.5MB)
    // 2. Timeout pada Vercel Serverless Functions
    // 3. Penggunaan bandwidth server yang berlebihan
    const driveUrl = `https://drive.google.com/uc?export=view&id=${id}`;
    
    return NextResponse.redirect(driveUrl, 302);
  } catch (error: any) {
    console.error('Drive file fetch error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
