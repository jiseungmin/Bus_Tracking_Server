const busTimetables = {
  CheonanAsanStation: [
    {
      scheduleId: 1,
      // 아산캠퍼스(출발)
      AsanCampusDeparture: '08:15',
      // 천안아산역출발
      CheonanTerminalStation: '08:15',
      // 아산캠퍼스(도착)
      AsanCampusArrival: '08:15',
      // 금요일운행여부
      isFridayDriving: true,
      status: 'driving',
      _id: {
        $oid: '660a92d05eb1e7b17bf683d4',
      },
    },
  ],
};
학기-평일: ['천안역', '아산(KTX)역', '천안터미널', '온양역/터미널', '천안캠퍼스'],
CheonanAsanStation;아산(KTX)역
CheonanCampus;천안캠퍼스
CheonanStation;천안역
CheonanTerminalStation;천안터미널
OnyangOncheonStation;온양역/터미널


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
===========================
CheonanAsanStation;
CheonanCampus;
CheonanStation;
CheonanTerminalStation;
OnyangOncheonStation;
===========================
上記のコードのvalueの値が下記のどれかであるこれを<DropdownMuen addNewSchedule={addNewSchedule} onMenuChange={handleMenuChange} />のコンポーネントの

