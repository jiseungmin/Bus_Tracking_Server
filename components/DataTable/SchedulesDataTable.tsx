import React, { useState, useEffect } from 'react';
import DropdownMuen from './DropdownMuen';
import { Input } from '../ui/input';

// APIから取得されるオブジェクトに対する型定義
type Schedule = {
  // _id: string;
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

// 仮定するSchedule型のデフォルト値を生成する関数;
const createDefaultSchedule = (): Schedule => {
  return {
    // _id: "",
    scheduleId: Math.floor(Math.random() * 10000),
    AsanCampusDeparture: '7:00',
    TerminalArrival: '7:00',
    DoojeongMcDonaldsDeparture: '7:00',
    HomeMartEveryDayDeparture: '7:00',
    SeoulNationalUniversityHospitalDeparture: '7:00',
    AsanCampusArrival: '7:00',
    isFridayDriving: false,
    status: 'notDriving',
  };
};
// const busTimetables = [
//   {
//     apiUrl: '/api/weekdays/A_CheonanTerminalStation',
//     tableHeaders: {
//       손: scheduleId,
//       '아산캠퍼스 (출발)': AsanCampusDeparture,
//       터니머: TerminalArrival,
//       '두정동 맥도날드': DoojeongMcDonaldsDeparture,
//       '홈마트 에브리데이': HomeMartEveryDayDeparture,
//       '서울대 정병원': SeoulNationalUniversityHospitalDeparture,
//       '아산캠퍼스(도착)': AsanCampusArrival,
//       '금요일운행 여부': isFridayDriving,
//       '운행 여부': status,
//     },
//     createDefaultSchedule: () => ({
//       scheduleId: Math.floor(Math.random() * 10000),
//       AsanCampusDeparture: '7:00',
//       TerminalArrival: '7:00',
//       DoojeongMcDonaldsDeparture: '7:00',
//       HomeMartEveryDayDeparture: '7:00',
//       SeoulNationalUniversityHospitalDeparture: '7:00',
//       AsanCampusArrival: '7:00',
//       isFridayDriving: false,
//       status: 'notDriving',
//     }),
//   },
//   // 他のBusTimetableインスタンスの設定をここに追加
// ];

export default function BusTimetable() {
  const [busSchedule, setBusSchedule] = useState<Schedule[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // 編集中のスケジュールID
  const [editScheduleData, setEditScheduleData] = useState<Schedule | null>(null); // 編集中のスケジュールデータ
  const [selectedMenu, setSelectedMenu] = useState<{ menu: string | null; item: string | null }>({
    menu: null,
    item: null,
  });

  const handleMenuChange = (menu: string, item: string) => {
    setSelectedMenu({ menu, item });
    // ここで選択に基づいてデータをフェッチまたは切り替える
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/weekdays/A_CheonanTerminalStation');
  //       if (!response.ok) {
  //         throw new Error('データの取得に失敗しました。');
  //       }
  //       const data: ApiData = await response.json();
  //       console.log(data);
  //       setBusSchedule(data.content.CheonanTerminalStation);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 送信したいデータ
        const sendData = {
          key: 'value', // ここに実際に送りたいデータを設定します
        };

        const response = await fetch('/api/weekdays/A_CheonanTerminalStation', {
          method: 'POST', // HTTPメソッドをPOSTに設定
          headers: {
            'Content-Type': 'application/json', // コンテントタイプをJSONに設定
          },
          body: JSON.stringify(sendData), // 送信データをJSON文字列に変換
        });

        if (!response.ok) {
          throw new Error('データの取得に失敗しました。');
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

  const addNewSchedule = () => {
    // 現在のスケジュールIDの最大値を見つける
    const maxScheduleId = busSchedule.reduce(
      (maxId, schedule) => Math.max(maxId, schedule.scheduleId),
      0
    );

    // 新しいスケジュールオブジェクトを生成
    const newSchedule = createDefaultSchedule();

    // 新しいスケジュールIDを設定（最大スケジュールID + 1）
    newSchedule.scheduleId = maxScheduleId + 1;

    // 新しいスケジュールオブジェクトをスケジュール配列に追加
    setBusSchedule((prevSchedules) => [...prevSchedules, newSchedule]);
  };

  // handleEditChange関数を更新
  const handleEditChange = (value: string | boolean, field: keyof Schedule) => {
    if (editScheduleData == null) return;
    setEditScheduleData({
      ...editScheduleData,
      [field]: value,
    });
  };
  // 編集時にscheduleIdを使用するように変更
  const toggleEdit = (schedule: Schedule) => {
    setEditingId(schedule.scheduleId); // _idからscheduleIdに変更
    setEditScheduleData(schedule);
  };

  // 保存ロジック
  const saveChanges = async (scheduleId: number) => {
    // 更新データの識別子をscheduleIdに変更
    const updateData = {
      ...editScheduleData,
      scheduleId, // idからscheduleIdに変更
    };

    // 送信するデータをログに出力
    console.log('送信する更新データ:', updateData);
    if (!editScheduleData) return;
    console.log(editScheduleData);
    try {
      const response = await fetch(`/api/weekdays/A_CheonanTerminalStation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editScheduleData),
      });

      if (!response.ok) {
        throw new Error('データの保存に失敗しました。');
      }

      // スケジュール配列を更新する際にもscheduleIdを使用
      const index = busSchedule.findIndex((schedule) => schedule.scheduleId === scheduleId);
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
      <div className="flex items-center py-1">
        <DropdownMuen addNewSchedule={addNewSchedule} onMenuChange={handleMenuChange} />
      </div>
      <table>
        <thead>
          <tr>
            {/* 두정동 홈마트 서울대 아산캠퍼스 금요일 터미널 맥도날드 에브리데이 정병원 (도착) 운행여부 */}
            <th>손</th>
            {/* <th>スケジュールID</th> */}
            <th>아산캠퍼스 (출발)</th>
            {/* <th>アサンキャンパス出発</th> */}
            <th>터니머</th>
            {/* <th>ターミナル到着</th> */}
            <th>두정동 맥도날드</th>
            {/* <th>ドージョンマクドナルド出発</th> */}
            <th>홈마트 에브리데이</th>
            {/* <th>ホームマートエブリデイ出発</th> */}
            <th>서울대 정병원</th>
            {/* <th>ソウル国立大学病院出発</th> */}
            <th>아산캠퍼스(도착)</th>
            {/* <th>アサンキャンパス到着</th> */}
            <th>금요일운행 여부</th>
            {/* <th>金曜日運転</th> */}
            <th>운행 여부</th>
            {/* <th>状態</th> */}
            <th>편집</th>
            {/* <th>編集</th> */}
          </tr>
        </thead>
        <tbody>
          {busSchedule.map((schedule) => (
            <tr key={schedule.scheduleId}>
              {/* <th>スケジュールID</th> scheduleId */}
              <td>{schedule.scheduleId}</td>
              {/* <th>アサンキャンパス出発</th> AsanCampusDeparture */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.AsanCampusDeparture || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'AsanCampusDeparture')}
                  />
                ) : (
                  schedule.AsanCampusDeparture || 'N/A'
                )}
              </td>
              {/* <th>ターミナル到着</th> <td>{schedule.TerminalArrival}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.TerminalArrival || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'TerminalArrival')}
                  />
                ) : (
                  schedule.TerminalArrival || 'N/A'
                )}
              </td>
              {/* <th>ドージョンマクドナルド出発</th> <td>{schedule.DoojeongMcDonaldsDeparture}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.DoojeongMcDonaldsDeparture || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'DoojeongMcDonaldsDeparture')}
                  />
                ) : (
                  schedule.DoojeongMcDonaldsDeparture || 'N/A'
                )}
              </td>
              {/* <th>ホームマートエブリデイ出発</th> schedule.HomeMartEveryDayDeparture */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.HomeMartEveryDayDeparture || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'HomeMartEveryDayDeparture')}
                  />
                ) : (
                  schedule.HomeMartEveryDayDeparture || 'N/A'
                )}
              </td>
              {/* <th>ソウル国立大学病院出発</th> <td>{schedule.SeoulNationalUniversityHospitalDeparture}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.SeoulNationalUniversityHospitalDeparture || ''}
                    onChange={(e) =>
                      handleEditChange(e.target.value, 'SeoulNationalUniversityHospitalDeparture')
                    }
                  />
                ) : (
                  schedule.SeoulNationalUniversityHospitalDeparture || 'N/A'
                )}
              </td>
              {/* <th>アサンキャンパス到着</th> <td>{schedule.AsanCampusArrival}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    type="text"
                    value={editScheduleData?.AsanCampusArrival || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'AsanCampusArrival')}
                  />
                ) : (
                  schedule.AsanCampusArrival || 'N/A'
                )}
              </td>
              {/* <th>金曜日運転</th> <td>{schedule.isFridayDriving ? "はい" : "いいえ"}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <Input
                    className="w-4"
                    type="checkbox"
                    checked={editScheduleData ? editScheduleData.isFridayDriving : false}
                    onChange={(e) => handleEditChange(e.target.checked, 'isFridayDriving')}
                  />
                ) : schedule.isFridayDriving ? (
                  '운행함'
                ) : (
                  '운행안함'
                )}
              </td>
              {/* <th>状態</th> <td>{schedule.status}</td> */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <input
                    type="text"
                    value={editScheduleData?.status || ''}
                    onChange={(e) => handleEditChange(e.target.value, 'status')}
                  />
                ) : (
                  schedule.status
                )}
              </td>
              {/* button=>>saveChanges/toggleEdit */}
              <td>
                {editingId === schedule.scheduleId ? (
                  <button onClick={() => saveChanges(schedule.scheduleId)}>저장</button>
                ) : (
                  <button onClick={() => toggleEdit(schedule)}>편집</button>
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
          font-family: 'Arial', sans-serif; // フォントファミリーの指定
        }
        th {
          background-color: #007bff; // ヘッダーの背景色を変更
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
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
        input[type='text'],
        input[type='checkbox'] {
          padding: 8px;
          margin: 5px 0; // 入力フィールドの周囲に少し余白を設ける
          border: 1px solid #ccc; // 境界線を明確にする
          border-radius: 4px; // やや丸みを帯びた境界線
          box-sizing: border-box; // ボックスサイズの計算方法を指定
          width: calc(100% - 16px); // パディングを含めた全体の幅から計算
        }

        input[type='text']:focus {
          border-color: #007bff; // フォーカス時に境界線の色を変更
          outline: none; // デフォルトのアウトラインを削除
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); // フォーカス時にソフトな影を追加
        }

        input[type='checkbox'] {
          margin-right: 8px; // チェックボックスとテキストの間に余白を設ける
          cursor: pointer; // ホバー時のカーソルを指にする
        }

        input[type='text']:hover,
        input[type='checkbox']:hover {
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
