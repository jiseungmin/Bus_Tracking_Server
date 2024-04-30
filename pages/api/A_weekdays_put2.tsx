import { Model } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnect';

import CheonanAsanStation from '@/database/models/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/weekdays/M_OnyangOncheonStation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // keyがstringでなければエラーを返す
  const key = typeof req.query.key === 'string' ? req.query.key : undefined;
  if (!key) {
    return res.status(400).json({ error: '適切なキーが提供されていません。' });
  }

  // 以下の処理を続ける...
  const scheduleIdToFind = parseInt(req.body.scheduleId);
  console.log('ScheduleId:', scheduleIdToFind);

  const ModelMap = {
    CheonanAsanStation: CheonanAsanStation,
    CheonanCampus: CheonanCampus,
    CheonanStation: CheonanStation,
    CheonanTerminalStation: CheonanTerminalStation,
    OnyangOncheonStation: OnyangOncheonStation,
  };

  interface ModelMap {
    [key: string]: Model<any, {}, {}, {}, any, any> | undefined;
    CheonanAsanStation: Model<any, {}, {}, {}, any, any>;
    CheonanCampus: Model<any, {}, {}, {}, any, any>;
    CheonanStation: Model<any, {}, {}, {}, any, any>;
    CheonanTerminalStation: Model<any, {}, {}, {}, any, any>;
    OnyangOncheonStation: Model<any, {}, {}, {}, any, any>;
  }

  const modelMap: ModelMap = {
    CheonanAsanStation,
    CheonanCampus,
    CheonanStation,
    CheonanTerminalStation,
    OnyangOncheonStation,
  };

  // 以下の使用方法が安全になります。
  const model = modelMap[key];
  if (!model) {
    return res.status(404).json({ error: '指定されたステーションが見つかりません。' });
  }
  if (!Model) {
    return res.status(404).json({ error: '指定されたステーションが見つかりません。' });
  }

  try {
    const documentId = '662faf654b75f88cbd2fd142'; // このIDは例として使用
    const updateData = req.body; // 更新するデータ
    const stationData = await Model.findById(documentId);

    if (!stationData || !stationData.schedules) {
      throw new Error('更新対象のスケジュールが見つかりません。');
    }

    const index = stationData.schedules.findIndex(
      (schedule: any) => schedule.scheduleId === scheduleIdToFind
    );

    if (index === -1) {
      stationData.schedules.push(updateData);
      stationData.markModified('schedules');
    } else {
      stationData.schedules[index] = {
        ...stationData.schedules[index],
        ...updateData,
      };
      stationData.markModified(`schedules.${index}`);
    }

    const updatedSchedule = await stationData.save();
    res.status(200).json({ schedule: updatedSchedule });
  } catch (error: any) {
    console.error('スケジュールの更新中にエラーが発生しました:', error);
    res.status(500).json({ error: 'サーバー側でエラーが発生しました。', details: error.message });
  }
}
