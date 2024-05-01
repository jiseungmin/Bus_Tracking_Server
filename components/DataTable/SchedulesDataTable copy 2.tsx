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

// 仮定するSchedule型のデフォルト値を生成する関数;
const createDefaultSchedule = (): Schedule => {
  return {
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

const weekdaysfieldsMap = {
  천안역: [
    'scheduleId',
    'AsanCampusDeparture',
    'StationArrival',
    'HiRexSpa',
    'YongamVillage',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
  '아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanTerminalStation',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'TerminalArrival',
    'DoojeongMcDonaldsDeparture',
    'HomeMartEveryDayDeparture',
    'SeoulNationalUniversityHospitalDeparture',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
  '온양역/터미널': [
    'scheduleId',
    'AsanCampusDeparture',
    'JueunApartmentBusStopDeparture',
    'OnyangOncheonStationStop',
    'TerminalArrival',
    'GwongokElementarySchoolBusStop',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
  천안캠퍼스: [
    'scheduleId',
    'AsanCampusDeparture',
    'Sinbangdong_trans',
    'Cheongsudong_trans',
    'CheonanCampusStop',
    'Cheongsudong',
    'Sinbangdong',
    'AsanCampusArrival',
    'status',
  ],
};
const sundaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStation_trans1',
    'CheonanStation',
    'CheonanAsanStation_trans2',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'TerminalArrival',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
};
const weekdaystableHeaders = {
  천안역: [
    '순',
    '아산캠퍼스 (출발)',
    '천안역',
    '하이렉스파 건너편',
    '용암마을',
    '아산캠퍼스 (도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
  ],
  '아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역출발',
    '아산캠퍼스 (도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '두정동맥도날드',
    '홈마트에브리데이',
    '서울대정병원',
    '아산캠퍼스 (도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
  ],
  '온양역/터미널': [
    '순',
    '아산캠퍼스 (출발)',
    '주은아파트버스정류장',
    '온양온천역',
    '아산터미널',
    '권곡초버스정류장',
    '아산캠퍼스 (도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
  ],
  천안캠퍼스: [
    '순',
    '아산캠퍼스출발',
    '신방동',
    '청수동',
    '천안캠퍼스',
    '청수동',
    '신방동',
    '아산캠퍼스도착',
    '운행여부',
    '편집',
  ], //CheonanCampus
};
const sundaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역',
    '천안역',
    '천안아산역',
    '아산캠퍼스(도착)',
    '금요일운행여부',
    '운행 여부',
    '편집',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '아산캠퍼스(도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
  ],
};

export default function BusTimetable() {
  const [busSchedule, setBusSchedule] = useState<Schedule[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // 編集中のスケジュールID
  const [editScheduleData, setEditScheduleData] = useState<Schedule | null>(null); // 編集中のスケジュールデータ
  const [selectedMenu, setSelectedMenu] = useState<string>(''); // nullから空文字に変更
  const [selectedItem, setSelectedItem] = useState<string>(''); // nullから空文字に変更

  // 正しい状態更新関数を使用する
  const handleMenuChange = (menu: string, item: string) => {
    setSelectedMenu(menu);
    setSelectedItem(item);
  };
  const [scheduleIdValue, setScheduleIdValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiPath = '';
        let keyValue = '';
        if (selectedMenu === '평일') {
          apiPath = '/api/A_weekdays';
          const keyMap: { [key: string]: string } = {
            천안역: 'CheonanStation',
            '아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
            '온양역/터미널': 'OnyangOncheonStation',
            천안캠퍼스: 'CheonanCampus',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '일요일') {
          apiPath = '/api/A_sundays';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        }

        const sendData = {
          key: keyValue,
        };

        const fullPath = `${apiPath}?key=${keyValue}`;
        // console.log(fullPath);
        const response = await fetch(fullPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        });

        if (!response.ok) {
          throw new Error('データの取得に失敗しました。');
        }
        const data = await response.json();
        console.log('取得したデータ', data);
        if (data && data.schedules) {
          setBusSchedule(data.schedules[keyValue]);
          setScheduleIdValue(data.schedules._id); // _id を状態として保存
        }
        if (keyValue && data.schedules[keyValue]) {
          setBusSchedule(data.schedules[keyValue]);
        } else {
          console.error('指定されたキーに対応するデータがありません。');
          setBusSchedule([]); // デフォルト値を設定するか、適切なエラーハンドリングを行ってください。
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedMenu, selectedItem]); // 依存配列に selectedMenu と selectedItem を追加

  const getTableHeaders = () => {
    if (
      selectedMenu === '평일' &&
      weekdaystableHeaders[selectedItem as keyof typeof weekdaystableHeaders]
    ) {
      return weekdaystableHeaders[selectedItem as keyof typeof weekdaystableHeaders];
    } else if (
      selectedMenu === '일요일' &&
      sundaystableHeaders[selectedItem as keyof typeof sundaystableHeaders]
    ) {
      return sundaystableHeaders[selectedItem as keyof typeof sundaystableHeaders];
    }
    return []; // マッチするヘッダーがない場合は空配列を返す
  };

  const getFieldMap = () => {
    if (selectedMenu === '평일') {
      return weekdaysfieldsMap;
    } else if (selectedMenu === '일요일') {
      return sundaysfieldsMap;
    }
    return {}; // デフォルトの空オブジェクト
  };

  // 表示するフィールドの配列を取得
  const fieldsToShow: string[] = (getFieldMap() as { [key: string]: string[] })[selectedItem] || [];

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

  const saveChanges = async (scheduleId: number) => {
    if (!editScheduleData) return;

    try {
      let apiPath = '';
      let keyValue = '';
      if (selectedMenu === '평일') {
        apiPath = '/api/A_weekdays_put';
        const keyMap: { [key: string]: string } = {
          천안역: 'CheonanStation',
          '아산(KTX)역': 'CheonanAsanStation',
          천안터미널: 'CheonanTerminalStation',
          '온양역/터미널': 'OnyangOncheonStation',
          천안캠퍼스: 'CheonanCampus',
        };
        keyValue = keyMap[selectedItem];
      } else if (selectedMenu === '일요일') {
        apiPath = '/api/A_sundays_put';
        const keyMap: { [key: string]: string } = {
          '천안역/아산(KTX)역': 'CheonanAsanStation',
          천안터미널: 'CheonanTerminalStation',
        };
        keyValue = keyMap[selectedItem];
      }

      const updateData = {
        ...editScheduleData,
        scheduleId,
      };

      // ログで更新データを表示
      console.log('送信する更新データ:', updateData);
      const fullPath = `${apiPath}?key=${keyValue}&_id=${scheduleIdValue}`;
      // const fullPath = `${apiPath}?key=${keyValue}`;
      const response = await fetch(fullPath, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('データの保存に失敗しました。');
      }

      const data = await response.json();
      const updatedSchedule = data.schedule; // APIの応答に基づいて適切に調整してください。

      const index = busSchedule.findIndex((schedule) => schedule.scheduleId === scheduleId);
      const updatedSchedules = [...busSchedule];
      if (index !== -1) {
        updatedSchedules[index] = updatedSchedule || updateData; // 応答がスケジュールを返さない場合は送信データを使用
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
        <DropdownMuen
          addNewSchedule={addNewSchedule}
          onMenuChange={handleMenuChange}
          selectedMenu={selectedMenu}
          selectedItem={selectedItem}
        />
      </div>
      <table>
        <thead>
          <tr>
            {getTableHeaders().map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {busSchedule.map((schedule) => (
            <tr key={schedule.scheduleId}>
              {fieldsToShow.map((field) => (
                <td key={field}>
                  {editingId === schedule.scheduleId ? (
                    field === 'isFridayDriving' ? (
                      <Input
                        className="w-4"
                        type="checkbox"
                        checked={editScheduleData ? editScheduleData[field] : false}
                        onChange={(e) =>
                          handleEditChange(e.target.checked, field as keyof Schedule)
                        }
                      />
                    ) : (
                      <Input
                        type="text"
                        value={
                          editScheduleData
                            ? typeof editScheduleData[field as keyof Schedule] === 'boolean'
                              ? editScheduleData[field as keyof Schedule]
                                ? 'true'
                                : 'false'
                              : (editScheduleData[field as keyof Schedule] || '').toString()
                            : ''
                        }
                        onChange={(e) => handleEditChange(e.target.value, field as keyof Schedule)}
                      />
                    )
                  ) : field === 'isFridayDriving' ? (
                    schedule[field as keyof Schedule] ? (
                      '운행함'
                    ) : (
                      '운행안함'
                    )
                  ) : (
                    schedule[field as keyof Schedule] || 'N/A'
                  )}
                </td>
              ))}
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
