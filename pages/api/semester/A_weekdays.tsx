// pages\api\weekdays\A_main.tsx
// http://localhost:3000/api/A_weekdays?key=CheonanCampus
// pages/api/weekdays/A_main.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

<<<<<<< HEAD:pages/api/A_weekdays.ts
import CheonanAsanStation from '@/database/models/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/weekdays/M_OnyangOncheonStation';
=======
// 異なるステーションのデータモデルをインポートします
import CheonanAsanStation from '@/database/models/semester/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/semester/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/semester/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/semester/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/semester/weekdays/M_OnyangOncheonStation';
>>>>>>> origin/takaan:pages/api/semester/A_weekdays.tsx

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const { key } = req.query;

  try {
    let data;

    switch (key) {
      case 'CheonanAsanStation':
        data = await CheonanAsanStation.findById('66126978e5520917f5ffee56');
        break;
      case 'CheonanCampus':
        data = await CheonanCampus.findById('66150c037a5e033c5904ffb5');
        break;
      case 'CheonanStation':
        data = await CheonanStation.findById('662faf654b75f88cbd2fd142');
        break;
      case 'CheonanTerminalStation':
        data = await CheonanTerminalStation.findById('65ffdf4464a583def02d8c73');
        break;
      case 'OnyangOncheonStation':
        data = await OnyangOncheonStation.findById('661261e6e5520917f5ffee55');
        break;
      default:
        return res.status(404).json({ error: '指定されたステーションが見つかりません。' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'スケジュールが見つかりません。' });
    }

    res.status(200).json({ schedules: data });
    // res.status(200).json({  data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
