import mongoose from 'mongoose';

// CheonanAsanStation のスキーマ定義
const cheonanAsanStationSchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  CheonanAsanStation_trans1: String,
  CheonanStation: String,
  CheonanAsanStation_trans2: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String,
}); // コレクション名を指定

// export default CheonanAsanStation  = mongoose.models.CheonanAsanStation || mongoose.model('CheonanAsanStation', cheonanAsanStationSchema);


export default mongoose.models.CheonanAsanStation || mongoose.model('CheonanAsanStation', cheonanAsanStationSchema, 'Sunday');
