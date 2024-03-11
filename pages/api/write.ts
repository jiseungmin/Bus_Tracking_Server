// pages/api/write.js
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filePath, content } = req.query;

  if (typeof filePath === 'string' && typeof content === 'string') {
    const CACHE_PATH = process.env.VERCEL === '1'
      ? path.join('/tmp', 'notion-blog-kit', 'notion', 'cache')
      : path.join(process.cwd(), 'notion', 'cache');

    try {
      if (!fs.existsSync(CACHE_PATH)) {
        fs.mkdirSync(CACHE_PATH, { recursive: true });
      }
      const writePath = path.join(CACHE_PATH, filePath);
      await fs.promises.writeFile(writePath, content, 'utf-8');

      res.status(200).json({ message: 'Write success' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to write file' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
