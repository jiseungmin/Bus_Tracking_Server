import React, { useState } from "react";

// テーブルデータのサンプル（実際はAPIから取得したり、静的ファイルから読み込んだりする可能性があります）
const initialBusSchedule = [
  // 各行のデータをオブジェクトとして追加します
  {
    number: 1, //순
    sunmoon_departure: "7:40", //아산캠퍼스 출발
    cheonan_departure: "8:10", //천안역
    delay: "5분~10분 소요예상", //하이엑스파 건너편
    delay2: "5분~10분 소요예상", //용암마을
    arrival: "8:40", //아산캠퍼스 도착
    status: "금(X)", //금요일 운행여부
  },
];

export default function BusTimetable() {
  // バススケジュールデータのステートを用意します
  const [busSchedule, setBusSchedule] = useState(initialBusSchedule);

  // 新しい行を追加する関数
  const addNewRow = () => {
    const newRow = {
      number: busSchedule.length + 1, // 新しい行番号
      sunmoon_departure: "", // 新しい出発時刻
      cheonan_departure: "", //천안역
      delay: "", //하이엑스파 건너편
      delay2: "", //용암마을
      arrival: "", //아산캠퍼스 도착
      status: "", //금요일 운행여부
    };
    setBusSchedule([...busSchedule, newRow]);
  };
  return (
    <div>
      <button onClick={addNewRow}>新しい行を追加</button>

      <table>
        <thead>
          <tr>
            <th>순</th>
            <th>아산캠퍼스 출발</th>
            <th>천안역</th>
            <th>하이엑스파 건너편</th>
            <th>용암마을</th>
            <th>아산캠퍼스 도착</th>
            <th>금요일 운행여부</th>
          </tr>
        </thead>
        <tbody>
          {busSchedule.map((item, index) => (
            <tr key={index}>
              <td>{item.number}</td>
              <td>{item.sunmoon_departure}</td>
              <td>{item.cheonan_departure}</td>
              <td>{item.delay}</td>
              <td>{item.delay2}</td>
              <td>{item.arrival}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ここにCSSを適用 */}
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid black;
        }
        th,
        td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #ffcc00; // ヘッダーの背景色
          color: black;
        }
        // その他のCSSスタイリング...
      `}</style>
    </div>
  );
}
