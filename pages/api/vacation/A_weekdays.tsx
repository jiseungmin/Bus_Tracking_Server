// pages\api\vacation\A_weekdays.ts
// http://localhost:3000/api/vacation/A_weekdays?key=CheonanAsanStation
// pages/api/weekdays/A_main.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

// 異なるステーションのデータモデルをインポートします
import VactionWeekdayCheonanAsanStation from '@/database/models/vacation/weekdays/M_CheonanAsanStation';
import VactionWeekdayCheonanTerminalStation from '@/database/models/vacation/weekdays/M_CheonanTerminalStation';
import VactionWeekdaysOnyangOncheonStation from '@/database/models/vacation/weekdays/M_OnyangOncheonStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const { key } = req.query; // クエリパラメータからkeyの値を取得
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers


  try {
    let data;
    switch (key) {
      case 'CheonanAsanStation':
        data = await VactionWeekdayCheonanAsanStation.findById('66421730583bee2d1425245e');
        break;
      case 'CheonanTerminalStation':
        data = await VactionWeekdayCheonanTerminalStation.findById('66421735583bee2d1425245f');
        break;
      case 'OnyangOncheonStation':
        data = await VactionWeekdaysOnyangOncheonStation.findById('664212d1583bee2d1425245b');
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
