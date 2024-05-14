// pages\api\A_holidays.tsx
// http://localhost:3000/api/A_holidays?key=CheonanAsanStation
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

// 異なるステーションのデータモデルをインポートします
import HolidaysCheonanAsanStation from '@/database/models/semester/holidays/M_CheonanAsanStation';
import HolidaysCheonanTerminalStation from '@/database/models/semester/holidays/M_CheonanTerminalStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const { key } = req.query; // クエリパラメータからkeyの値を取得

  try {
    let data;
    switch (key) {
      case 'CheonanAsanStation':
        data = await HolidaysCheonanAsanStation.findById('66128578e5520917f5ffee65');
        break;
      case 'CheonanTerminalStation':
        data = await HolidaysCheonanTerminalStation.findById('661284dce5520917f5ffee62');
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
