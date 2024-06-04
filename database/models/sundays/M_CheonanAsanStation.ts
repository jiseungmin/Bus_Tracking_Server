import mongoose from 'mongoose';

// CheonanAsanStation のスキーマ定義
const cheonanAsanStationscheduleEntrySchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  CheonanAsanStation_trans1: String,
  CheonanStation: String,
  CheonanAsanStation_trans2: String,
  AsanCampusArrival: String,
  status: String,
});
const cheonanAsanStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanAsanStation: [cheonanAsanStationscheduleEntrySchema]
});
export default mongoose.models.SundaysCheonanAsanStation || mongoose.model('SundaysCheonanAsanStation', cheonanAsanStationSchema, 'Sunday');
