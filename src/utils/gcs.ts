import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET || 'myuxscore-crawls';

export async function uploadToGCS(filePath: string, destination: string): Promise<string> {
  await storage.bucket(bucketName).upload(filePath, {
    destination,
    public: true,
    metadata: { cacheControl: 'no-cache' }
  });
  return `https://storage.googleapis.com/${bucketName}/${destination}`;
}
