import mongoose from 'mongoose';

// CheonanAsanStation のスキーマ定義
const cheonanAsanStationscheduleEntrySchema = new mongoose.Schema({
  scheduleId: Number,//순
  AsanCampusDeparture: String,//아산캠퍼스(출발)
  CheonanAsanStationArrival: String,//천안아산역도착
  WolbongCheongsol1Danji: String,//월봉청솔1단지
  SsangyongDongHiMart: String,//쌍용동하이마트
  CheonanStation: String,//천안역
  OppositeHighlexSpa: String,//하이렉스파건너편
  YongamVillage: String,//용암마을
  CheonanAsanStationDeparture: String,//천안아산역 출발
  AsanCampusArrival: String,//아산캠퍼스(도착)
  status: String,
});
const cheonanAsanStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanAsanStation: [cheonanAsanStationscheduleEntrySchema]
});
export default mongoose.models.VactionSundaysCheonanAsanStation || mongoose.model('VactionSundaysCheonanAsanStation', cheonanAsanStationSchema, 'VactionSunday');
