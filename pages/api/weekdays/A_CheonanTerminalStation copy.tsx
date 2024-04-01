// pages\api\weekdays\A_CheonanTerminalStation.tsx
// http://localhost:3000/api/weekdays/A_CheonanTerminalStation

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/database/dbConnect";
import CheonanTerminalStation from "@/database/models/weekdays/M_CheonanTerminalStation";

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
      try {
        // リクエストボディから `id` を取得し、`_id` に割り当てます。
        const { id: _id, ...updateData } = req.body as { id: string } & Record<
          string,
          any
        >;

        // updateDataから_idを除外します（もし含まれている場合）。
        delete updateData._id;

        // IDを使用してドキュメントを検索します。
        const scheduleToUpdate = await CheonanTerminalStation.findById(
          "65ffdf4464a583def02d8c73"
        );

        if (!scheduleToUpdate) {
          return res
            .status(404)
            .json({ error: "更新対象のスケジュールが見つかりません。" });
        }

        // 更新データでドキュメントを更新します。
        Object.keys(updateData).forEach((key) => {
          scheduleToUpdate.set(key, updateData[key]);
        });

        // 更新を保存します。
        const updatedSchedule = await scheduleToUpdate.save();

        res.status(200).json({ content: updatedSchedule });
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
