// // pages/api/write.js
// import { NextApiRequest, NextApiResponse } from 'next';
// import fs from 'fs';
// import path from 'path';
// //import lockfile from 'lockfile';

// export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
//   const { filePath, content } = req.query;

//   if (typeof filePath === 'string' && typeof content === 'string') {
//     const CACHE_PATH =
//       process.env.VERCEL === '1' ? path.join('/tmp') : path.join(process.cwd(), 'notion', 'cache');

//     try {
//       if (!fs.existsSync(CACHE_PATH)) {
//         fs.mkdirSync(CACHE_PATH, { recursive: true });
//       }

//       const writePath = path.join(CACHE_PATH, filePath);
//       const lockPath = `${writePath}.lock`;
//       let existingData = [];

//       // 파일 잠금 설정
//       await new Promise<void>((resolve, reject) => {
//      //   lockfile.lock(lockPath, { retries: 10, retryWait: 100 }, (err: any) => {
//           if (err) reject(err);
//           else resolve();
//         });
//       });

//       try {
//         // 파일이 존재하는 경우, 기존 데이터를 읽어옵니다.
//         if (fs.existsSync(writePath)) {
//           const fileContent = await fs.promises.readFile(writePath, 'utf-8');
//           existingData = JSON.parse(fileContent);
//         }

//         // 새로운 콘텐츠를 파싱합니다.
//         const newContent = JSON.parse(content);
//         const { busorder, station } = newContent;

//         // 동일한 busorder와 station을 가진 항목이 있는지 확인합니다.
//         const index = existingData.findIndex((entry: any) => {
//           return entry.busorder === busorder && entry.station === station;
//         });

//         if (index !== -1) {
//           // 기존 항목을 업데이트합니다.
//           existingData[index].latitude = newContent.latitude;
//           existingData[index].longitude = newContent.longitude;
//         } else {
//           // 새로운 항목을 추가합니다.
//           existingData.push(newContent);
//         }

//         // 업데이트된 데이터를 파일에 다시 씁니다.
//         await fs.promises.writeFile(writePath, JSON.stringify(existingData, null, 2), 'utf-8');

//         res.status(200).json({ message: 'Write success' });
//       } finally {
//         // 파일 잠금 해제
//         lockfile.unlock(lockPath, (err: any) => {
//           if (err) console.error('Failed to unlock file:', err);
//         });
//       }
//     } catch (error) {
//       console.error('Failed to write file:', error);
//       res.status(500).json({ error: 'Failed to write file' });
//     }
//   } else {
//     res.status(400).json({ error: 'Invalid request' });
//   }
// }

// //https://bus-tracking-server-mu.vercel.app/api/write?filePath=data.json&content={test:%20true}
// //https://bus-tracking-server-mu.vercel.app/api/read?filePath=data.json
