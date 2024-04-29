// pages\api\weekdays\A_CheonanTerminalStation.tsx
// http://localhost:3000/api/weekdays/A_CheonanTerminalStation

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnect';
import CheonanTerminalStation from '@/database/models/weekdays/M_CheonanTerminalStation';
import type { ICheonanTerminalStationSchedule } from '@/database/models/weekdays/M_CheonanTerminalStation';

async function updateSchedule(
  documentId: string,
  updateData: Partial<ICheonanTerminalStationSchedule> // この部分を修正
) {
  try {
    const scheduleToUpdate = await CheonanTerminalStation.findById(documentId);

    if (!scheduleToUpdate || !scheduleToUpdate.CheonanTerminalStation) {
      throw new Error('更新対象のスケジュールが見つかりません。');
    }

    const index = scheduleToUpdate.CheonanTerminalStation.findIndex(
      (schedule) => schedule.scheduleId === updateData.scheduleId
    );
    // indexが-1の場合、つまりscheduleIdが一致するスケジュールが見つからなかった場合
    if (index === -1) {
      // 新しいスケジュールとして追加
      // 必要なフィールドの存在を確認するロジックをここに追加する必要がある
      scheduleToUpdate.CheonanTerminalStation.push(updateData as ICheonanTerminalStationSchedule);
      // 変更をマーク
      scheduleToUpdate.markModified('CheonanTerminalStation');
      const updatedSchedule = await scheduleToUpdate.save();
      console.log('新しいスケジュールが追加されました:', updatedSchedule);
    } else {
      // 既存のスケジュールを更新
      scheduleToUpdate.CheonanTerminalStation[index] = {
        ...scheduleToUpdate.CheonanTerminalStation[index],
        ...updateData,
      };
      // 変更をマーク
      scheduleToUpdate.markModified('CheonanTerminalStation');
      const updatedSchedule = await scheduleToUpdate.save();
      console.log('更新されたスケジュール:', updatedSchedule);
    }
  } catch (error: any) {
    console.error('スケジュールの更新中にエラーが発生しました:', error.message);
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // 固定IDのスケジュールを検索
        const schedule = await CheonanTerminalStation.findById('65ffdf4464a583def02d8c73');
        if (!schedule) {
          return res.status(404).json({ error: 'スケジュールが見つかりません。' });
        }
        res.status(200).json({ content: schedule });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT':
      // PUTリクエストの処理を更新
      try {
        // リクエストボディから更新データを取得します（_idは除外）。
        const { id, ...updateData } = req.body;

        // updateSchedule関数を使用してスケジュールを更新します。
        await updateSchedule('65ffdf4464a583def02d8c73', updateData);

        // 成功レスポンスを送信します。
        res.status(200).json({ message: 'スケジュールが更新されました。' });
      } catch (error: any) {
        console.error(error); // エラー内容をログに出力
        res.status(500).json({
          error: error.message || '内部サーバーエラーが発生しました。',
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
