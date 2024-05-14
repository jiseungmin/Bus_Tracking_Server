// pages\api\A_holidays.tsx
// http://localhost:3000/api/vacation/A_holidays?key=CheonanAsanStation
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

// 異なるステーションのデータモデルをインポートします
import VactionHolidaysCheonanAsanStation from '@/database/models/vacation/holidays/M_CheonanAsanStation';
import VactionHolidaysCheonanTerminalStation from '@/database/models/vacation/holidays/M_CheonanTerminalStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const { key } = req.query; // クエリパラメータからkeyの値を取得

  try {
    let data;
    switch (key) {
      case 'CheonanAsanStation':
        data = await VactionHolidaysCheonanAsanStation.findById('66420baf583bee2d1425244e');
        break;
      case 'CheonanTerminalStation':
        data = await VactionHolidaysCheonanTerminalStation.findById('66420fb1583bee2d14252453');
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
