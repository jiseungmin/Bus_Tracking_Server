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
      //운행 여부
      status: 'driving',
      // _id: {
      //   $oid: '660a92d05eb1e7b17bf683d4',
      // },
    },
  ],
};
학기-평일: ['천안역', '아산(KTX)역', '천안터미널', '온양역/터미널', '천안캠퍼스'],
CheonanAsanStation;아산(KTX)역
CheonanCampus;천안캠퍼스
CheonanStation;천안역
CheonanTerminalStation;천안터미널
OnyangOncheonStation;온양역/터미널

selectedMenu, selectedItemの値によって変更されるように
========================
selectedMenuが평일 のときで
selectedItemの値を'천안역'→CheonanStation
scheduleId
      AsanCampusDeparture
      StationArrival
      HiRexSpa
      YongamVillage
      AsanCampusArrival
      isFridayDriving
      status

selectedItemの値を '아산(KTX)역'→CheonanAsanStation
 scheduleId
      AsanCampusDeparture
      CheonanTerminalStation
      AsanCampusArrival
      isFridayDriving
      status

selectedItemの値を '천안터미널'→CheonanTerminalStation
      scheduleId
      AsanCampusDeparture
      TerminalArrival
      DoojeongMcDonaldsDeparture
      HomeMartEveryDayDeparture
      SeoulNationalUniversityHospitalDeparture
      AsanCampusArrival
      isFridayDriving
      status

selectedItemの値を'온양역/터미널'→OnyangOncheonStation
scheduleId
      AsanCampusDeparture
      JueunApartmentBusStopDeparture
      OnyangOncheonStationStop
      TerminalArrival
      GwongokElementarySchoolBusStop
      AsanCampusArrival
      isFridayDriving
      status

selectedItemの値を'천안캠퍼스'→CheonanCampus
scheduleId
      AsanCampusDeparture
      Sinbangdong_trans
      Cheongsudong_trans
      CheonanCampus
      Cheongsudong
      Sinbangdong
      AsanCampusArrival
      status

========================
selectedMenuが일요일 のときで
selectedItemの値を '천안역/아산(KTX)역'→CheonanAsanStation
    scheduleId
      AsanCampusDeparture
      CheonanAsanStation_trans1
      CheonanStation
      CheonanAsanStation_trans2
      AsanCampusArrival
      isFridayDriving
      status

selectedItemの値を '천안터미널'→CheonanTerminalStation
      scheduleId
      AsanCampusDeparture
      TerminalArrival
      AsanCampusArrival
      isFridayDriving
      status