import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';

import CheonanAsanStation from '@/database/models/semester/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/semester/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/semester/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/semester/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/semester/weekdays/M_OnyangOncheonStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  const alldata = req.body;
  console.log('Received data:', alldata);

  const scheduleIdToFind = parseInt(req.body.scheduleId);
  console.log('ScheduleId:', scheduleIdToFind);

  const _id = req.query._id;
  console.log('Received _id:', _id);

  const key = req.query.key;
  console.log('Received key:', key);

  // isFullData クエリパラメータの受け取り
  const isFullData = req.query.isFullData === 'true'; // 文字列 "true" が true として評価されるように変換
  console.log('Is full data update:', isFullData);

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

      if (isFullData) {
        // 全データを更新するロジック
        console.log('全データを更新します。');
        // req.bodyを完全に新しいデータとして設定
        data[key] = req.body.schedules; // req.body.schedules が新しいスケジュール配列と想定
      } else {
        const stationData = data[key]; // ダイナミックな参照

        const foundSchedule = stationData.find(
          (schedule: any) => schedule.scheduleId === scheduleIdToFind
        );

        if (foundSchedule) {
          // 既存のスケジュールを更新
          console.log('既存のスケジュールを更新します。');
          Object.keys(req.body).forEach((key) => {
            if (key in foundSchedule) {
              foundSchedule[key] = req.body[key];
            }
          });
        } else {
          // 新しいスケジュールを追加
          console.log('新しいスケジュールを追加します。');
          const newSchedule = { ...req.body, scheduleId: scheduleIdToFind };
          stationData.push(newSchedule);
          console.log('new row data add:', newSchedule);
        }
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
