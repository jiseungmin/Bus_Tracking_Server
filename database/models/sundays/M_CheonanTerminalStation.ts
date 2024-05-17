import mongoose from 'mongoose';

// CheonanTerminalStation のスキーマ定義
const cheonanTerminalStationEntrySchema = new mongoose.Schema({
    scheduleId: Number,
    AsanCampusDeparture: String,
    TerminalArrival: String,
    AsanCampusArrival: String,
    status: String,
  });
const cheonanTerminalStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanTerminalStation: [cheonanTerminalStationEntrySchema]
});
export default mongoose.models.SundaysCheonanTerminalStation || mongoose.model('SundaysCheonanTerminalStation', cheonanTerminalStationSchema, 'Sunday');
