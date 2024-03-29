import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/database/dbConnect";
import CheonanTerminalStation from "@/database/models/weekdays/M_CheonanTerminalStation";

// API ルートのハンドラーとしてのデフォルト関数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await dbConnect();

    try {
      const schedules = await CheonanTerminalStation.find({});
      // const document = await ArticleModel.findOne().lean<IDocument>();
      console.log(schedules);
      if (schedules.length === 0) {
        return res
          .status(404)
          .json({ error: "スケジュールが見つかりません。" });
      }
      res.status(200).json({ contents: schedules });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // GET リクエスト以外の場合は405 Method Not Allowed を返す
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
