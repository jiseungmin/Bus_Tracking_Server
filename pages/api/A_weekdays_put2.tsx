import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnect';

import CheonanAsanStation from '@/database/models/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/weekdays/M_OnyangOncheonStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log('req.body.scheduleId:', req.body.scheduleId); // クエリのログ
  console.log('req body:', req.body); // クエリのログ
  const scheduleIdToFind = parseInt(req.body.scheduleId);
  console.log('ScheduleId:', scheduleIdToFind); // クエリのログ

  const key = req.query.key;
  console.log('Received key:', key); //CheonanStation

  interface ScheduleItem {
    scheduleId: number;
    AsanCampusDeparture: string;
    StationArrival: string;
    HiRexSpa: string;
    YongamVillage: string;
    AsanCampusArrival: string;
    isFridayDriving: boolean;
    status: string;
    [key: string]: any; // 任意の文字列キーを受け入れる
  }

  interface StationData {
    _id: string;
    CheonanStation: ScheduleItem[];
  }

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
      console.log('data:', typeof data);
      // const stationData = await CheonanStation.findOne({});
      const stationData = data.toObject() as typeof CheonanStation & {
        CheonanStation: ScheduleItem[];
      };
      const foundSchedule = stationData.CheonanStation.find(
        (schedule: ScheduleItem) => schedule.scheduleId === scheduleIdToFind
      );

      if (foundSchedule) {
        Object.keys(req.body).forEach((key) => {
          console.log(`Updating ${key} from ${foundSchedule[key]} to ${req.body[key]}`);
          if (key in foundSchedule) {
            foundSchedule[key] = req.body[key];
          }
        });
        // console.log('Updated foundSchedule:', foundSchedule);
        // console.log('Data saved stationData:', stationData);
        console.log(
          'stationData instanceof CheonanStation:',
          stationData instanceof CheonanStation
        );

        const updatedData = {
          ...data.toObject(), // dataオブジェクト全体を展開
          CheonanStation: [...stationData.CheonanStation], // 新しいCheonanStationデータで配列を更新
        };
        console.log('Updated data:', updatedData);
        // await CheonanStation.findByIdAndUpdate(data._id, { $set: updatedData });

        data = updatedData;
        console.log('data instanceof CheonanStation:', data instanceof CheonanStation);
        console.log('data.save:', data);
        await data.save();

        res.status(200).json({ schedule: data });
      } else {
        res.status(404).json({ error: 'スケジュールが見つかりません。' });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'サーバー側でエラーが発生しました。', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
