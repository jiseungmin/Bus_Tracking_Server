import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnect';

import CheonanAsanStation from '@/database/models/weekdays/M_CheonanAsanStation';
import CheonanCampus from '@/database/models/weekdays/M_CheonanCampus';
import CheonanStation from '@/database/models/weekdays/M_CheonanStation';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import OnyangOncheonStation from '@/database/models/weekdays/M_OnyangOncheonStation';
import { ICheonanStationSchedule } from '@/database/models/weekdays/M_CheonanStation';

async function updateSchedule(
  documentId: string | string[] | undefined,
  updateData: Partial<ICheonanStationSchedule> // この部分を修正
) {
  try {
    const scheduleToUpdate = await CheonanStation.findById(documentId);

    if (!scheduleToUpdate || !scheduleToUpdate.CheonanStation) {
      throw new Error('更新対象のスケジュールが見つかりません。');
    }

    const index = scheduleToUpdate.CheonanStation.findIndex(
      (schedule: any) => schedule.scheduleId === updateData.scheduleId
    );
    // 既存のスケジュールを更新
    scheduleToUpdate.CheonanStation[index] = {
      ...scheduleToUpdate.CheonanStation[index],
      ...updateData,
    };
    // 変更をマーク
    scheduleToUpdate.markModified('CheonanStation');
    const updatedSchedule = await scheduleToUpdate.save();
    console.log('更新されたスケジュール:', updatedSchedule);
  } catch (error: any) {
    console.error('スケジュールの更新中にエラーが発生しました:', error.message);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log('req body:', req.body); // クエリのログ

  const key = req.query.key;
  const _id = req.query._id;
  const updateData = req.body;

  const scheduleIdToUpdate = req.query.scheduleId;

  if (req.method === 'PUT') {
    try {
      // var data;
      // switch (key) {
      //   case 'CheonanAsanStation':
      //     data = await CheonanAsanStation.findByIdAndUpdate(_id, req.body, { new: true });
      //     break;
      //   case 'CheonanCampus':
      //     data = await CheonanCampus.findByIdAndUpdate(_id, req.body, { new: true });
      //     break;
      //   case 'CheonanStation':
      //     data = await CheonanStation.findByIdAndUpdate(_id, req.body);

      //     data = await CheonanStation.findByIdAndUpdate(_id, req.body, { new: true });
      //     break;
      //   case 'CheonanTerminalStation':
      //     data = await CheonanTerminalStation.findByIdAndUpdate(_id, req.body, { new: true });
      //     break;
      //   case 'OnyangOncheonStation':
      //     data = await OnyangOncheonStation.findByIdAndUpdate(_id, req.body, { new: true });
      //     break;
      //   default:
      //     return res.status(404).json({ error: '指定されたステーションが見つかりません。' });
      // }
      const { id, ...updateData } = req.body;

      // updateSchedule関数を使用してスケジュールを更新します。
      await updateSchedule(_id, updateData);
      // await data.save();

      // console.log('data:', typeof data);
      // console.log('data instanceof CheonanStation:', data instanceof CheonanStation);
      // console.log('data:', data);

      // res.status(200).json({ schedule: data });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'サーバー側でエラーが発生しました。', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// data = await CheonanStation.findOneAndUpdate(
//   { _id, 'CheonanStation.scheduleId': scheduleId },
//   { $set: { 'CheonanStation.$[elem]': updateData } },
//   {
//     new: true,
//     arrayFilters: [{ 'elem.scheduleId': scheduleId }],
//   }
// );
