import { google } from 'googleapis';
import { Readable } from 'stream';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export async function uploadFileToDrive(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const stream = new Readable();
  stream.push(Buffer.from(buffer));
  stream.push(null);

  // Minta Google Drive untuk membuat ID unik terlebih dahulu
  const generateRes = await drive.files.generateIds({ count: 1 });
  const fileId = generateRes.data.ids?.[0];

  if (!fileId) {
    throw new Error('Failed to generate file ID');
  }

  // Dapatkan ekstensi asli (misal: .jpg, .png)
  const originalExtension = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '';
  
  // Setel meta data agar nama file persis mengikuti ID-nya
  const fileMetadata = {
    id: fileId,
    name: `${fileId}${originalExtension}`,
    parents: FOLDER_ID ? [FOLDER_ID] : [],
  };

  const media = {
    mimeType: file.type,
    body: stream,
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  if (!response.data.id) {
    throw new Error('Failed to upload file to Google Drive');
  }

  return response.data.id;
}

export async function deleteFileFromDrive(fileId: string): Promise<void> {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error: any) {
    console.error(`Failed to delete file ${fileId} from Drive:`, error.message);
    // Continue even if delete fails, it might have been already deleted
  }
}

export async function getDriveFileStream(fileId: string) {
  const response = await drive.files.get(
    { fileId: fileId, alt: 'media' },
    { responseType: 'stream' }
  );
  return response;
}
