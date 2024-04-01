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
  const [editingId, setEditingId] = useState<string | null>(null); // 編集中のスケジュールID
  const [editScheduleData, setEditScheduleData] = useState<Schedule | null>(
    null
  ); // 編集中のスケジュールデータ

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

  const handleEditChange = (value: string, field: keyof Schedule) => {
    setEditScheduleData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const toggleEdit = (schedule: Schedule) => {
    setEditingId(schedule._id);
    setEditScheduleData(schedule);
  };

  // 保存ロジック
  const saveChanges = async (id: string) => {
    if (!editScheduleData) return;
    console.log(editScheduleData);
    try {
      const response = await fetch(`/api/weekdays/A_CheonanTerminalStation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editScheduleData),
      });

      if (!response.ok) {
        throw new Error("データの保存に失敗しました。");
      }

      const index = busSchedule.findIndex((schedule) => schedule._id === id);
      const updatedSchedules = [...busSchedule];
      if (index !== -1) {
        updatedSchedules[index] = editScheduleData;
      }
      setBusSchedule(updatedSchedules);

      setEditingId(null);
      setEditScheduleData(null);
    } catch (error) {
      console.error(error);
    }
  };

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
              {/* スケジュールIDを表示または編集 */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.scheduleId || ""}
                    onChange={(e) =>
                      handleEditChange(e.target.value, "scheduleId")
                    }
                  />
                ) : (
                  schedule.scheduleId
                )}
              </td>
              {/* ... 他のフィールドも同様に編集可能にする ... */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.AsanCampusDeparture || ""}
                    onChange={(e) =>
                      handleEditChange(e.target.value, "AsanCampusDeparture")
                    }
                  />
                ) : (
                  schedule.AsanCampusDeparture || "N/A"
                )}
              </td>
              <td>{schedule.TerminalArrival}</td>
              <td>{schedule.DoojeongMcDonaldsDeparture}</td>
              <td>{schedule.HomeMartEveryDayDeparture}</td>
              <td>{schedule.SeoulNationalUniversityHospitalDeparture}</td>
              <td>{schedule.AsanCampusArrival}</td>
              <td>{schedule.isFridayDriving ? "はい" : "いいえ"}</td>
              <td>{schedule.status}</td>
              <td>
                {editingId === schedule._id ? (
                  <button onClick={() => saveChanges(schedule._id)}>
                    保存
                  </button>
                ) : (
                  <button onClick={() => toggleEdit(schedule)}>編集</button>
                )}
              </td>
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
