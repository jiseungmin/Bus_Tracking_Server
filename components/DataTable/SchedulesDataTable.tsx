import React, { useState, useEffect } from 'react';
import DropdownMuen from './DropdownMuen';
import { Input } from '../ui/input';
import {
  weekdaystableHeaders,
  weekdaysfieldsMap,
  sundaystableHeaders,
  sundaysfieldsMap,
  holidaystableHeaders,
  holidaysfieldsMap,
  vacationweekdaystableHeaders,
  vacationweekdaysfieldsMap,
  vacationsundaystableHeaders,
  vacationsundaysfieldsMap,
  vacationholidaystableHeaders,
  vacationholidaysfieldsMap,
} from './TableMapFields';

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

export default function BusTimetable() {
  const [busSchedule, setBusSchedule] = useState<Schedule[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // 編集中のスケジュールID
  const [editScheduleData, setEditScheduleData] = useState<Schedule | null>(null); // 編集中のスケジュールデータ
  const [selectedMenu, setSelectedMenu] = useState('평일'); // '평일' で初期化
  const [selectedItem, setSelectedItem] = useState('천안역'); // '천안역' で初期化
  const [triggerSave, setTriggerSave] = useState(false); // 保存をトリガーするためのフラグ
  const [scheduleIdValue, setScheduleIdValue] = useState('');
  const [periodMenu, setPeriodMenu] = useState<'학기' | '방학' | null>('학기'); // PeriodMenuの状態を追加

  // PeriodMenuの状態を更新する関数
  const handlePeriodChange = (newPeriod: '학기' | '방학' | null) => {
    setPeriodMenu(newPeriod);
  };

  // 正しい状態更新関数を使用する
  const handleMenuChange = (menu: string, item: string) => {
    console.log('Updating state to:', menu, item); // 状態更新前にログ出力
    setSelectedMenu(menu);
    setSelectedItem(item);
  };

  // useEffectを使用して状態変更を監視
  useEffect(() => {
    console.log('Selected periodMenu changed to:', periodMenu);
    console.log('Selected Menu changed to:', selectedMenu);
    console.log('Selected Item changed to:', selectedItem);
  }, [selectedMenu, selectedItem, periodMenu]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiPath = '';
        let keyValue = '';
        // 학기 경우
        if (periodMenu === '학기') {
          if (selectedMenu === '평일') {
            apiPath = '/api/semester/A_weekdays';
            const keyMap: { [key: string]: string } = {
              천안역: 'CheonanStation',
              '아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
              '온양역/터미널': 'OnyangOncheonStation',
              천안캠퍼스: 'CheonanCampus',
            };
            keyValue = keyMap[selectedItem];
          } else if (selectedMenu === '일요일') {
            apiPath = '/api/semester/A_sundays';
            const keyMap: { [key: string]: string } = {
              '천안역/아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
            };
            keyValue = keyMap[selectedItem];
          } else if (selectedMenu === '토요일/공휴일') {
            apiPath = '/api/semester/A_holidays';
            const keyMap: { [key: string]: string } = {
              '천안역/아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
            };
            keyValue = keyMap[selectedItem];
          }
          // 방학 경우
        } else if (periodMenu === '방학') {
          if (selectedMenu === '평일') {
            apiPath = '/api/vacation/A_weekdays';
            const keyMap: { [key: string]: string } = {
              '천안역/아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
              '온양터미널/온양역': 'OnyangOncheonStation',
            };
            keyValue = keyMap[selectedItem];
          } else if (selectedMenu === '일요일') {
            apiPath = '/api/vacation/A_sundays';
            const keyMap: { [key: string]: string } = {
              '천안역/아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
            };
            keyValue = keyMap[selectedItem];
          } else if (selectedMenu === '토요일') {
            apiPath = '/api/vacation/A_holidays';
            const keyMap: { [key: string]: string } = {
              '천안역/아산(KTX)역': 'CheonanAsanStation',
              천안터미널: 'CheonanTerminalStation',
            };
            keyValue = keyMap[selectedItem];
          }
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
  }, [selectedMenu, selectedItem, periodMenu]); // 依存配列に selectedMenu と selectedItem を追加

  const getTableHeaders = () => {
    if (periodMenu === '학기') {
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
      } else if (
        selectedMenu === '토요일/공휴일' &&
        holidaystableHeaders[selectedItem as keyof typeof holidaystableHeaders]
      ) {
        return holidaystableHeaders[selectedItem as keyof typeof holidaystableHeaders];
      }
    } else if (periodMenu === '방학') {
      if (
        selectedMenu === '평일' &&
        vacationweekdaystableHeaders[selectedItem as keyof typeof vacationweekdaystableHeaders]
      ) {
        return vacationweekdaystableHeaders[
          selectedItem as keyof typeof vacationweekdaystableHeaders
        ];
      } else if (
        selectedMenu === '일요일' &&
        vacationsundaystableHeaders[selectedItem as keyof typeof vacationsundaystableHeaders]
      ) {
        return vacationsundaystableHeaders[
          selectedItem as keyof typeof vacationsundaystableHeaders
        ];
      } else if (
        selectedMenu === '토요일' &&
        vacationholidaystableHeaders[selectedItem as keyof typeof vacationholidaystableHeaders]
      ) {
        return vacationholidaystableHeaders[
          selectedItem as keyof typeof vacationholidaystableHeaders
        ];
      }
    }
    return []; // マッチするヘッダーがない場合は空配列を返す
  };

  const getFieldMap = () => {
    if (periodMenu === '학기') {
      if (selectedMenu === '평일') {
        return weekdaysfieldsMap;
      } else if (selectedMenu === '일요일') {
        return sundaysfieldsMap;
      } else if (selectedMenu === '토요일/공휴일') {
        return holidaysfieldsMap;
      }
    } else if (periodMenu === '방학') {
      if (selectedMenu === '평일') {
        return vacationweekdaysfieldsMap;
      } else if (selectedMenu === '일요일') {
        return vacationsundaysfieldsMap;
      } else if (selectedMenu === '토요일') {
        return vacationholidaysfieldsMap;
      }
    }
    return {}; // デフォルトの空オブジェクト
  };

  const fieldsToShow: string[] = (getFieldMap() as { [key: string]: string[] })[selectedItem] || [];

  const handleEditChange = (value: string | boolean, field: keyof Schedule) => {
    if (editScheduleData == null) return;
    setEditScheduleData({
      ...editScheduleData,
      [field]: value,
    });
  };

  const toggleEdit = (schedule: Schedule) => {
    setEditingId(schedule.scheduleId); // _idからscheduleIdに変更
    setEditScheduleData(schedule);
  };

  const saveChanges = async (scheduleId: number) => {
    if (!editScheduleData) {
      console.error('編集データが存在しません。');
      return;
    }

    try {
      let apiPath = '';
      let keyValue = '';
      // 학기 경우
      if (periodMenu === '학기') {
        if (selectedMenu === '평일') {
          apiPath = '/api/semester/A_weekdays_put';
          const keyMap: { [key: string]: string } = {
            천안역: 'CheonanStation',
            '아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
            '온양역/터미널': 'OnyangOncheonStation',
            천안캠퍼스: 'CheonanCampus',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '일요일') {
          apiPath = '/api/semester/A_sundays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '토요일/공휴일') {
          apiPath = '/api/semester/A_holidays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        }
      } else if (periodMenu === '방학') {
        if (selectedMenu === '평일') {
          apiPath = '/api/vacation/A_weekdays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
            '온양터미널/온양역': 'OnyangOncheonStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '일요일') {
          apiPath = '/api/vacation/A_sundays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '토요일') {
          apiPath = '/api/vacation/A_holidays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        }
      }

      const updateData = {
        ...editScheduleData,
        scheduleId,
      };

      // ログで更新データを表示
      console.log('送信する更新データ:', updateData);
      const fullPath = `${apiPath}?key=${keyValue}&scheduleId=${scheduleId}&_id=${scheduleIdValue}`;
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
      console.log('APIからの完全な応答:', data);

      const schedulesArray = data.schedule[keyValue];
      console.log(`${keyValue}に対応するスケジュール配列:`, schedulesArray);

      if (!schedulesArray) {
        console.error(`${selectedItem}に対応するスケジュール配列が見つかりません。`);
        return;
      }

      // `scheduleId` に一致するスケジュールを検索
      const updatedSchedule = schedulesArray.find((s: any) => s.scheduleId === scheduleId);
      console.log('更新されたスケジュール:', updatedSchedule);

      const index = busSchedule.findIndex((schedule) => schedule.scheduleId === scheduleId);
      const updatedSchedules = [...busSchedule];

      if (index !== -1 && updatedSchedule) {
        updatedSchedules[index] = updatedSchedule;
        setBusSchedule(updatedSchedules);
      } else {
        console.error('適切なスケジュールが見つかりませんでした。');
      }

      setEditingId(null);
      setEditScheduleData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewSchedule = () => {
    if (busSchedule.length === 0) {
      console.error('追加するための既存のスケジュールがありません。');
      return;
    }

    // 現在のスケジュールリストから最大の scheduleId を取得
    const maxScheduleId = busSchedule.reduce(
      (maxId, schedule) => Math.max(maxId, schedule.scheduleId),
      -1
    );

    // 既存の最後のスケジュールをコピーして新しいスケジュールオブジェクトを作成
    const lastSchedule = busSchedule[busSchedule.length - 1];
    const newSchedule = { ...lastSchedule, scheduleId: maxScheduleId + 1 };

    // スケジュールリストに新しいスケジュールを追加
    setBusSchedule([...busSchedule, newSchedule]);

    // 編集ステートを更新して、直ちに編集モードに入る
    setEditingId(newSchedule.scheduleId);
    setEditScheduleData(newSchedule);

    // 新しいスケジュールをサーバーに保存する
    // saveChanges(newSchedule.scheduleId);
  };

  const saveAllChanges = async () => {
    if (!busSchedule || busSchedule.length === 0) {
      console.error('保存するデータが存在しません。');
      return;
    }

    try {
      let apiPath = '';
      let keyValue = '';
      if (periodMenu === '학기') {
        if (selectedMenu === '평일') {
          apiPath = '/api/semester/A_weekdays_put';
          const keyMap: { [key: string]: string } = {
            천안역: 'CheonanStation',
            '아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
            '온양역/터미널': 'OnyangOncheonStation',
            천안캠퍼스: 'CheonanCampus',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '일요일') {
          apiPath = '/api/semester/A_sundays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '토요일/공휴일') {
          apiPath = '/api/semester/A_holidays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        }
      } else if (periodMenu === '방학') {
        if (selectedMenu === '평일') {
          apiPath = '/api/vacation/A_weekdays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
            '온양터미널/온양역': 'OnyangOncheonStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '일요일') {
          apiPath = '/api/vacation/A_sundays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        } else if (selectedMenu === '토요일') {
          apiPath = '/api/vacation/A_holidays_put';
          const keyMap: { [key: string]: string } = {
            '천안역/아산(KTX)역': 'CheonanAsanStation',
            천안터미널: 'CheonanTerminalStation',
          };
          keyValue = keyMap[selectedItem];
        }
      }

      console.log('送信する全データ:', busSchedule);
      const fullPath = `${apiPath}?key=${keyValue}&isFullData=true`; // 全データフラグを追加
      const response = await fetch(fullPath, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedules: busSchedule }),
      });

      if (!response.ok) {
        throw new Error('データの保存に失敗しました。');
      }

      const data = await response.json();
      console.log('APIからの完全な応答:', data);

      // // 応答をもとにスケジュール配列を更新する
      // setBusSchedule(data.updatedSchedules);
    } catch (error) {
      console.error('データ保存中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    if (triggerSave) {
      saveAllChanges();
      setTriggerSave(false); // 保存後にフラグをリセット
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busSchedule, triggerSave]); // 依存配列に triggerSave を追加

  const addScheduleBelowRow = async (scheduleId: number) => {
    console.log('addScheduleBelowRow called with scheduleId:', scheduleId); // ログにscheduleIdを出力
    const index = busSchedule.findIndex((s) => s.scheduleId === scheduleId);
    if (index === -1) return; // IDが見つからない場合は処理を中断

    let newScheduleId = scheduleId + 1;
    console.log('新しいスケジュールID:', newScheduleId);

    // 挿入位置以降のスケジュールのIDを+1する
    const updatedSchedules = busSchedule.map((schedule) => {
      if (schedule.scheduleId >= newScheduleId) {
        return { ...schedule, scheduleId: schedule.scheduleId + 1 };
      }
      return schedule;
    });

    const newSchedule: Schedule = {
      ...busSchedule[index],
      scheduleId: newScheduleId, // 新しいIDを割り当て
    };

    // 新しいスケジュールを挿入
    updatedSchedules.splice(index + 1, 0, newSchedule);
    console.log('updatedSchedules:', updatedSchedules);

    setBusSchedule(updatedSchedules);
    setTriggerSave(true); // 保存をトリガーするフラグをセット
  };

  return (
    <div>
      <div className="flex items-center py-1">
        <DropdownMuen
          addNewSchedule={addNewSchedule}
          onMenuChange={handleMenuChange}
          selectedMenu={selectedMenu}
          selectedItem={selectedItem}
          periodMenu={periodMenu}
          setPeriodMenu={setPeriodMenu}
          onPeriodChange={handlePeriodChange}
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
                    field === 'scheduleId' ? (
                      schedule[field as keyof Schedule] || 'N/A' // scheduleIdの場合は編集不可としてただ表示する
                    ) : field === 'isFridayDriving' ? (
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
                        style={{
                          height: '30px', // 入力フィールドの高さを30ピクセルに設定
                          padding: '4px 8px', // 内側の余白を上下4ピクセル、左右8ピクセルに設定
                          lineHeight: '22px', // テキストの行の高さを22ピクセルに設定
                          boxSizing: 'border-box', // ボーダーとパディングを高さと幅に含める
                        }}
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
                      '◯'
                    ) : (
                      'X'
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
              <td>
                <button onClick={() => addScheduleBelowRow(schedule.scheduleId)}>행 추가</button>
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
          padding: 5px;
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
          //margin: 5px 0;
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
