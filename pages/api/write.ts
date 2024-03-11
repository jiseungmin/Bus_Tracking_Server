// pages/api/write.js
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 경로 및 콘텐츠 쿼리 파라미터를 가져옵니다.
  const { filePath, content } = req.query;

  // filePath와 content 모두 문자열인지 확인합니다.
  if (typeof filePath === 'string' && typeof content === 'string') {
    const CACHE_PATH = process.env.VERCEL === '1'
      ? path.join('/tmp', 'notion-blog-kit', 'notion', 'cache')
      : path.join(process.cwd(), 'notion', 'cache');

    try {
      // 캐시 경로가 존재하는지 확인하고, 없으면 생성합니다.
      if (!fs.existsSync(CACHE_PATH)) {
        fs.mkdirSync(CACHE_PATH, { recursive: true });
      }
      // 파일을 작성합니다.
      const writePath = path.join(CACHE_PATH, filePath);
      await fs.promises.writeFile(writePath, content, 'utf-8');

      // 성공 응답을 보냅니다.
      res.status(200).json({ message: 'Write success' });
    } catch (error) {
      // 서버 에러 응답을 보냅니다.
      res.status(500).json({ error: 'Failed to write file' });
    }
  } else {
    // 잘못된 요청에 대한 응답을 보냅니다.
    res.status(400).json({ error: 'Invalid request' });
  }
}
