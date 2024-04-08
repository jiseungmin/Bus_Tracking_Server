// http://localhost:3000/api/A_sundays?key=CheonanAsanStation
// pages\api\A_sundays.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnect';

// 異なるステーションのデータモデルをインポートします
import CheonanAsanStation from '@/database/models/sundays/M_CheonanAsanStation';
import CheonanTerminalStation from '@/database/models/sundays/M_CheonanTerminalStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { key } = req.query; // クエリパラメータからkeyの値を取得

  try {
    let data;
    // keyの値に応じて異なる処理を行う
    switch (key) {
      case 'CheonanAsanStation':
        data = await CheonanAsanStation.findById("66128375e5520917f5ffee5d");
        break;
      case 'CheonanTerminalStation':
        data = await CheonanTerminalStation.findById("66128403e5520917f5ffee5e");
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
