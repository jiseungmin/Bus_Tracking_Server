import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

import CheonanAsanStation from '@/database/models/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/weekdays/M_OnyangOncheonStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();
  const scheduleIdToFind = parseInt(req.body.scheduleId);
  console.log('ScheduleId:', scheduleIdToFind);

  const key = req.query.key;
  console.log('Received key:', key);
  if (req.method === 'PUT') {
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

      if (!data) {
        return res.status(404).json({ error: 'データが見つかりません。' });
      }

      const stationData = data[key]; // ダイナミックな参照

      const foundSchedule = stationData.find(
        (schedule: any) => schedule.scheduleId === scheduleIdToFind
      );

      if (foundSchedule) {
        // 既存のスケジュールを更新
        Object.keys(req.body).forEach((key) => {
          if (key in foundSchedule) {
            foundSchedule[key] = req.body[key];
          }
        });
      } else {
        // 新しいスケジュールを追加
        const newSchedule = { ...req.body, scheduleId: scheduleIdToFind };
        stationData.push(newSchedule);
        console.log('new row data add:', newSchedule);
      }

      await data.save();
      console.log('data.save:', data);
      res.status(200).json({ schedule: data });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'サーバー側でエラーが発生しました。', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
