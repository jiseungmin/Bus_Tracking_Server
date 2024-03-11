// TypeScript 타입 임포트
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

// 캐시 경로 설정
const CACHE_PATH =
  process.env.VERCEL === '1'
    ? path.join('/tmp', 'notion-blog-kit', 'notion', 'cache')
    : path.join(process.cwd(), 'notion', 'cache');

// API 핸들러 함수 정의
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 쿼리 파라미터에서 filePath 추출
  const { filePath } = req.query;

  // filePath가 문자열인지 확인
  if (typeof filePath === 'string') {
    try {
      // 파일 읽기 경로 설정
      const readPath = path.join(CACHE_PATH, filePath);

      // 파일 내용 읽기
      const content = await fs.readFile(readPath, 'utf-8');

      // 성공 응답 보내기
      res.status(200).json({ content });
    } catch (error) {
      // 파일 읽기 실패 시 에러 응답 보내기
      res.status(500).json({ error: 'Failed to read file' });
    }
  } else {
    // 잘못된 요청 처리
    res.status(400).json({ error: 'Invalid request' });
  }
}