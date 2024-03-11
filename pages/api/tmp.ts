import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tmpDir = '/tmp';
    // fs.promises.readdir를 사용하여 비동기적으로 /tmp 디렉토리 읽기
    const files = await fs.readdir(tmpDir);

    console.log(files);

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read /tmp directory' });
  }
}
