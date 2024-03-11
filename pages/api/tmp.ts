import { promises as fs } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // fs.promises.readdir를 사용하여 비동기적으로 /tmp 디렉토리 읽기
    const cacheDir = path.join('/tmp', 'notion-blog-kit', 'notion', 'cache');
    const files = await fs.readdir(cacheDir);

    console.log(files);

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read /tmp directory' });
  }
}
