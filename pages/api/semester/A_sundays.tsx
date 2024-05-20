// http://localhost:3000/api/A_sundays?key=CheonanAsanStation
// pages\api\A_sundays.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

// 異なるステーションのデータモデルをインポートします
import SundaysCheonanAsanStation from '@/database/models/semester/sundays/M_CheonanAsanStation';
import SundaysCheonanTerminalStation from '@/database/models/semester/sundays/M_CheonanTerminalStation';

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
        data = await SundaysCheonanAsanStation.findById('66128375e5520917f5ffee5d');
        // console.log(data);
        break;
      case 'CheonanTerminalStation':
        data = await SundaysCheonanTerminalStation.findById('66128403e5520917f5ffee5e');
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
