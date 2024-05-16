//학기
export const weekdaysfieldsMap = {
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
export const sundaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStation_trans1',
    'CheonanStation',
    'CheonanAsanStation_trans2',
    'AsanCampusArrival',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'TerminalArrival',
    'AsanCampusArrival',
    'status',
  ],
};
export const holidaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStation_trans1',
    'CheonanStation',
    'CheonanAsanStation_trans2',
    'AsanCampusArrival',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'TerminalArrival',
    'AsanCampusArrival',
    'status',
  ],
};

export const weekdaystableHeaders = {
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
    'add row',
  ],
  '아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역출발',
    '아산캠퍼스 (도착)',
    '금요일운행 여부',
    '운행 여부',
    '편집',
    'add row',
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
    'add row',
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
    'add row',
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
    'add row',
  ],
};
export const sundaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역',
    '천안역',
    '천안아산역',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
};
export const holidaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역',
    '천안역',
    '천안아산역',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
};

//방학
export const vacationweekdaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStationArrival',
    'WolbongCheongsol1Danji',
    'SsangyongDongHiMart',
    'CheonanStation',
    'OppositeHighlexSpa',
    'YongamVillage',
    'CheonanAsanStationDeparture',
    'AsanCampusArrival',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'Terminal',
    'OldDujeongdongMcDonalds',
    'HomeMartEveryday',
    'SeoulNationalUniversityHospital',
    'AsanCampusArrival',
    'status',
  ],
  '온양터미널/온양역': [
    'scheduleId',
    'AsanCampusDeparture',
    'JueunApartmentBusStop',
    'OnyangOncheonStation',
    'AsanTerminal',
    'KwonGokElementarySchoolBusStop',
    'AsanCampusArrival',
    'isFridayDriving',
    'status',
  ],
};
export const vacationsundaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStationArrival',
    'WolbongCheongsol1Danji',
    'SsangyongDongHiMart',
    'CheonanStation',
    'OppositeHighlexSpa',
    'YongamVillage',
    'CheonanAsanStationDeparture',
    'AsanCampusArrival',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'Terminal',
    'OldDujeongdongMcDonalds',
    'HomeMartEveryday',
    'SeoulNationalUniversityHospital',
    'AsanCampusArrival',
    'status',
  ],
};
export const vacationholidaysfieldsMap = {
  '천안역/아산(KTX)역': [
    'scheduleId',
    'AsanCampusDeparture',
    'CheonanAsanStationArrival',
    'WolbongCheongsol1Danji',
    'SsangyongDongHiMart',
    'CheonanStation',
    'OppositeHighlexSpa',
    'YongamVillage',
    'CheonanAsanStationDeparture',
    'AsanCampusArrival',
    'status',
  ],
  천안터미널: [
    'scheduleId',
    'AsanCampusDeparture',
    'Terminal',
    'OldDujeongdongMcDonalds',
    'HomeMartEveryday',
    'SeoulNationalUniversityHospital',
    'AsanCampusArrival',
    'status',
  ],
};

export const vacationweekdaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역도착',
    '월봉청솔1단지',
    '쌍용동하이마트',
    '천안역',
    '하이렉스파 건너편',
    '용암마을',
    '천안아산역출발',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '(구)두정동맥도날드',
    '홈마트에브리데이',
    '서울대정병원',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  '온양터미널/온양역': [
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
    'add row',
  ],
};
export const vacationsundaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역도착',
    '월봉청솔1단지',
    '쌍용동하이마트',
    '천안역',
    '하이렉스파 건너편',
    '용암마을',
    '천안아산역출발',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '(구)두정동맥도날드',
    '홈마트에브리데이',
    '서울대정병원',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
};
export const vacationholidaystableHeaders = {
  '천안역/아산(KTX)역': [
    '순',
    '아산캠퍼스 (출발)',
    '천안아산역도착',
    '월봉청솔1단지',
    '쌍용동하이마트',
    '천안역',
    '하이렉스파 건너편',
    '용암마을',
    '천안아산역출발',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
  천안터미널: [
    '순',
    '아산캠퍼스 (출발)',
    '터미널',
    '(구)두정동맥도날드',
    '홈마트에브리데이',
    '서울대정병원',
    '아산캠퍼스(도착)',
    '운행 여부',
    '편집',
    'add row',
  ],
};