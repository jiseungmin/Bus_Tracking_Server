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
        console.log(data);
        setBusSchedule(data.content.CheonanTerminalStation);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // handleEditChange関数を更新
  const handleEditChange = (value: string | boolean, field: keyof Schedule) => {
    if (editScheduleData == null) return;
    setEditScheduleData({
      ...editScheduleData,
      [field]: value,
    });
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
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {busSchedule.map((schedule) => (
            <tr key={schedule._id}>
              {/* <th>スケジュールID</th> scheduleId */}
              <td>{schedule.scheduleId}</td>
              {/* <th>アサンキャンパス出発</th> AsanCampusDeparture */}
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
              {/* <th>ターミナル到着</th> <td>{schedule.TerminalArrival}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.TerminalArrival || ""}
                    onChange={(e) =>
                      handleEditChange(e.target.value, "TerminalArrival")
                    }
                  />
                ) : (
                  schedule.TerminalArrival || "N/A"
                )}
              </td>
              {/* <th>ドージョンマクドナルド出発</th> <td>{schedule.DoojeongMcDonaldsDeparture}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.DoojeongMcDonaldsDeparture || ""}
                    onChange={(e) =>
                      handleEditChange(
                        e.target.value,
                        "DoojeongMcDonaldsDeparture"
                      )
                    }
                  />
                ) : (
                  schedule.DoojeongMcDonaldsDeparture || "N/A"
                )}
              </td>
              {/* <th>ホームマートエブリデイ出発</th> schedule.HomeMartEveryDayDeparture */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.HomeMartEveryDayDeparture || ""}
                    onChange={(e) =>
                      handleEditChange(
                        e.target.value,
                        "HomeMartEveryDayDeparture"
                      )
                    }
                  />
                ) : (
                  schedule.HomeMartEveryDayDeparture || "N/A"
                )}
              </td>
              {/* <th>ソウル国立大学病院出発</th> <td>{schedule.SeoulNationalUniversityHospitalDeparture}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={
                      editScheduleData?.SeoulNationalUniversityHospitalDeparture ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        e.target.value,
                        "SeoulNationalUniversityHospitalDeparture"
                      )
                    }
                  />
                ) : (
                  schedule.SeoulNationalUniversityHospitalDeparture || "N/A"
                )}
              </td>
              {/* <th>アサンキャンパス到着</th> <td>{schedule.AsanCampusArrival}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.AsanCampusArrival || ""}
                    onChange={(e) =>
                      handleEditChange(e.target.value, "AsanCampusArrival")
                    }
                  />
                ) : (
                  schedule.AsanCampusArrival || "N/A"
                )}
              </td>
              {/* <th>金曜日運転</th> <td>{schedule.isFridayDriving ? "はい" : "いいえ"}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="checkbox"
                    checked={
                      editScheduleData
                        ? editScheduleData.isFridayDriving
                        : false
                    }
                    onChange={(e) =>
                      handleEditChange(e.target.checked, "isFridayDriving")
                    }
                  />
                ) : schedule.isFridayDriving ? (
                  "はい"
                ) : (
                  "いいえ"
                )}
              </td>
              {/* <th>状態</th> <td>{schedule.status}</td> */}
              <td>
                {editingId === schedule._id ? (
                  <input
                    type="text"
                    value={editScheduleData?.status || ""}
                    onChange={(e) => handleEditChange(e.target.value, "status")}
                  />
                ) : (
                  schedule.status
                )}
              </td>
              {/* button=>>saveChanges/toggleEdit */}
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
          border-collapse: collapse;
          margin-top: 20px;
          font-size: 0.9rem; // フォントサイズの調整
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 10px; // セル内の余白を少し大きく
          text-align: left;
          font-family: "Arial", sans-serif; // フォントファミリーの指定
        }
        th {
          background-color: #007bff; // ヘッダーの背景色を変更
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #ddd;
        }
        .button {
          // ボタン共通スタイルの抽象化
          background-color: #007bff; // ボタンの背景色
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s; // ホバー時の背景色変更アニメーション
        }
        .button:hover {
          background-color: #0056b3;
        }
        input[type="text"],
        input[type="checkbox"] {
          padding: 8px;
          margin: 5px 0; // 入力フィールドの周囲に少し余白を設ける
          border: 1px solid #ccc; // 境界線を明確にする
          border-radius: 4px; // やや丸みを帯びた境界線
          box-sizing: border-box; // ボックスサイズの計算方法を指定
          width: calc(100% - 16px); // パディングを含めた全体の幅から計算
        }

        input[type="text"]:focus {
          border-color: #007bff; // フォーカス時に境界線の色を変更
          outline: none; // デフォルトのアウトラインを削除
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); // フォーカス時にソフトな影を追加
        }

        input[type="checkbox"] {
          margin-right: 8px; // チェックボックスとテキストの間に余白を設ける
          cursor: pointer; // ホバー時のカーソルを指にする
        }

        input[type="text"]:hover,
        input[type="checkbox"]:hover {
          border-color: #0056b3; // ホバー時に境界線の色を濃くする
        }
        @media (max-width: 768px) {
          // レスポンシブデザインの考慮
          table {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
