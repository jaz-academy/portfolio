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

    const driveResponse = await getDriveFileStream(id);
    const contentType = driveResponse.headers['content-type'] || 'application/octet-stream';

    // Convert Node.js Readable stream to Web stream
    const nodeStream = driveResponse.data;
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk: any) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        nodeStream.on('end', () => {
          controller.close();
        });
        nodeStream.on('error', (err: any) => {
          controller.error(err);
        });
      },
      cancel() {
        nodeStream.destroy();
      }
    });

    return new NextResponse(webStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Drive file fetch error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
