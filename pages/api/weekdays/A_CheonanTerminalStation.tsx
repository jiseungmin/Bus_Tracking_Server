// pages\api\weekdays\A_CheonanTerminalStation.tsx
// http://localhost:3000/api/weekdays/A_CheonanTerminalStation

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/database/dbConnect";
import CheonanTerminalStation from "@/database/models/weekdays/M_CheonanTerminalStation";

async function updateSchedule(
  documentId: string,
  updateData: { scheduleId: number; [key: string]: any }
) {
  try {
    const scheduleToUpdate = await CheonanTerminalStation.findById(documentId);

    if (!scheduleToUpdate || !scheduleToUpdate.CheonanTerminalStation) {
      throw new Error("更新対象のスケジュールが見つかりません。");
    }

    const index = scheduleToUpdate.CheonanTerminalStation.findIndex(
      (schedule) => schedule.scheduleId === updateData.scheduleId
    );
    if (index !== -1) {
      // スケジュールオブジェクトを直接更新
      scheduleToUpdate.CheonanTerminalStation[index] = {
        ...scheduleToUpdate.CheonanTerminalStation[index],
        ...updateData,
      };
      const updatedSchedule = await scheduleToUpdate.save();
      console.log("更新されたスケジュール:", updatedSchedule);
    } else {
      throw new Error(
        "指定されたscheduleIdを持つスケジュールが見つかりません。"
      );
    }
  } catch (error: any) {
    console.error("スケジュールの更新中にエラーが発生しました:", error.message);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        // 固定IDのスケジュールを検索
        const schedule = await CheonanTerminalStation.findById(
          "65ffdf4464a583def02d8c73"
        );
        if (!schedule) {
          return res
            .status(404)
            .json({ error: "スケジュールが見つかりません。" });
        }
        res.status(200).json({ content: schedule });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "PUT":
      // PUTリクエストの処理を更新
      try {
        // リクエストボディから更新データを取得します（_idは除外）。
        const { id, ...updateData } = req.body;

        // updateSchedule関数を使用してスケジュールを更新します。
        await updateSchedule("65ffdf4464a583def02d8c73", updateData);

        // 成功レスポンスを送信します。
        res.status(200).json({ message: "スケジュールが更新されました。" });
      } catch (error: any) {
        console.error(error); // エラー内容をログに出力
        res.status(500).json({
          error: error.message || "内部サーバーエラーが発生しました。",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
