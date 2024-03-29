import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const CACHE_PATH =
  process.env.VERCEL === '1'
    ? path.join('/tmp')
    : path.join(process.cwd(), 'notion', 'cache');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { filePath } = req.query;

  if (typeof filePath === 'string') {
    try {
      const readPath = path.join(CACHE_PATH, filePath);
      const content = await fs.readFile(readPath, 'utf-8');
      res.status(200).json({ content });

    } catch (error) {
      res.status(500).json({ error: 'Failed to read file' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}