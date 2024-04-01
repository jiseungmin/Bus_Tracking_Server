import React, { useState, useEffect } from "react";

// APIから取得されるオブジェクトに対する型定義
type Schedule = {
  _id: string;
  scheduleId: number;
  AsanCampusDeparture: string;
  TerminalArrival: string;
  DoojeongMcDonaldsDeparture: string;
  HomeMartEveryDayDeparture: string;
  SeoulNationalUniversityHospitalDeparture: string;
  AsanCampusArrival: string;
  isFridayDriving: boolean;
  status: string;
};

type ApiData = {
  content: {
    _id: string;
    CheonanTerminalStation: Schedule[];
  };
};

export default function BusTimetable() {
  const [busSchedule, setBusSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/weekdays/A_CheonanTerminalStation");
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const data: ApiData = await response.json();
        setBusSchedule(data.content.CheonanTerminalStation);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>スケジュールID</th>
            <th>アサンキャンパス出発</th>
            <th>ターミナル到着</th>
            <th>ドージョンマクドナルド出発</th>
            <th>ホームマートエブリデイ出発</th>
            <th>ソウル国立大学病院出発</th>
            <th>アサンキャンパス到着</th>
            <th>金曜日運転</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {busSchedule.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.scheduleId}</td>
              <td>{schedule.AsanCampusDeparture || "N/A"}</td>
              <td>{schedule.TerminalArrival}</td>
              <td>{schedule.DoojeongMcDonaldsDeparture}</td>
              <td>{schedule.HomeMartEveryDayDeparture}</td>
              <td>{schedule.SeoulNationalUniversityHospitalDeparture}</td>
              <td>{schedule.AsanCampusArrival}</td>
              <td>{schedule.isFridayDriving ? "はい" : "いいえ"}</td>
              <td>{schedule.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse; // テーブルの境界線をまとめる
          margin-top: 20px; // テーブルの上の余白
        }
        th,
        td {
          border: 1px solid #ddd; // セルの境界線
          padding: 8px; // セル内の余白
          text-align: left; // テキストを左揃えにする
        }
        th {
          background-color: #4caf50; // ヘッダーの背景色
          color: white; // ヘッダーのテキスト色
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        } // 偶数行の背景色
        tr:hover {
          background-color: #ddd;
        } // ホバー時の行の背景色

        // ボタンのスタイル
        button {
          background-color: #4caf50; // ボタンの背景色
          color: white; // ボタンのテキスト色
          padding: 10px 20px; // ボタン内の余白
          border: none; // ボタンの境界線をなくす
          border-radius: 5px; // ボタンの角を丸くする
          cursor: pointer; // ホバー時のカーソルを指にする
          margin-top: 20px; // ボタンの上の余白
        }
        button:hover {
          background-color: #45a049; // ホバー時のボタンの背景色
        }
      `}</style>
    </div>
  );
}
