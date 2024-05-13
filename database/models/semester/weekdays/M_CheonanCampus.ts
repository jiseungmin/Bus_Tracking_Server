import mongoose from 'mongoose';

const scheduleEntrySchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  Sinbangdong_trans: String,
  Cheongsudong_trans: String,
  CheonanCampusStop: String,
  Cheongsudong: String,
  Sinbangdong: String,
  AsanCampusArrival: String,
  status: String,
});
// 親ドキュメントのスキーマを定義
const cheonanCampusSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanCampus: [scheduleEntrySchema]
});
export default mongoose.models.CheonanCampus || mongoose.model('CheonanCampus', cheonanCampusSchema, 'Weekday');

