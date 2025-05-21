import express from 'express';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { uploadToGCS } from '../utils/gcs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const crawlId = uuidv4();
    const htmlContent = `<html><body><h1>Sample Crawl ${crawlId}</h1></body></html>`;
    const filePath = `/tmp/${crawlId}.html`;
    fs.writeFileSync(filePath, htmlContent);

    const gcsUrl = await uploadToGCS(filePath, `${crawlId}.html`);
    fs.unlinkSync(filePath);

    res.status(201).json({ crawlId, url: gcsUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to crawl' });
  }
});

export default router;
