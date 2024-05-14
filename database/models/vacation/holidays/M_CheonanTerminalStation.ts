import mongoose from 'mongoose';

// CheonanTerminalStation のスキーマ定義
const cheonanTerminalStationEntrySchema = new mongoose.Schema({
  scheduleId: Number,//순
  AsanCampusDeparture: String,//아산캠퍼스(출발)
  Terminal: String,//터미널
  OldDujeongdongMcDonalds: String,//(구)두정동맥도날드
  HomeMartEveryday: String,//홈마트에브리데이
  SeoulNationalUniversityHospital: String,//서울대정병원
  AsanCampusArrival: String,//아산캠퍼스(도착)
  status: String,
  });
const cheonanTerminalStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanTerminalStation: [cheonanTerminalStationEntrySchema]
});
export default mongoose.models.VactionHolidaysCheonanTerminalStation || mongoose.model('VactionHolidaysCheonanTerminalStation', cheonanTerminalStationSchema, 'VactionSaturday/Holidays');