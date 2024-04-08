import mongoose from 'mongoose';

// CheonanTerminalStation のスキーマ定義
const cheonanTerminalStationSchema = new mongoose.Schema({
    scheduleId: Number,
    AsanCampusDeparture: String,
    TerminalArrival: String,
    AsanCampusArrival: String,
    isFridayDriving: Boolean,
    status: String,
  }); // このモデルも Weekday コレクションに保存されると仮定

//   const CheonanTerminalStation = mongoose.models.CheonanTerminalStation || mongoose.model('CheonanTerminalStation', cheonanTerminalStationSchema);


export default mongoose.models.CheonanAsanStation || mongoose.model('CheonanAsanStation', cheonanTerminalStationSchema, 'Sunday');