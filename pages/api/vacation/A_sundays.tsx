// http://localhost:3000/api/vacation/A_sundays?key=CheonanTerminalStation
// pages\api\A_sundays.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

// 異なるステーションのデータモデルをインポートします
import VactionSundaysCheonanAsanStation from '@/database/models/vacation/sundays/M_CheonanAsanStation';
import VactionSundaysCheonanTerminalStation from '@/database/models/vacation/sundays/M_CheonanTerminalStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const { key } = req.query; // クエリパラメータからkeyの値を取得
  res.setHeader('Access-Control-Allow-Origin', 'https://student-eta.vercel.app'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers


  try {
    let data;
    switch (key) {
      case 'CheonanAsanStation':
        data = await VactionSundaysCheonanAsanStation.findById('6642109d583bee2d14252455');
        // console.log(data);
        break;
      case 'CheonanTerminalStation':
        data = await VactionSundaysCheonanTerminalStation.findById('664210a2583bee2d14252456');
        // console.log(data);
        break;
      default:
        return res.status(404).json({ error: '指定されたステーションが見つかりません。' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'スケジュールが見つかりません。' });
    }

    res.status(200).json({ schedules: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
