import { promises as fs } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cacheDir = path.join('/tmp');
    const files = await fs.readdir(cacheDir);

    console.log(files);

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read /tmp directory' });
  }
}
