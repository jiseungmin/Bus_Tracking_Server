import mongoose from 'mongoose';

const cheonanCampusSchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  Sinbangdong_trans: String,
  Cheongsudong_trans: String,
  CheonanCampus: String,
  Cheongsudong: String,
  Sinbangdong: String,
  AsanCampusArrival: String,
  status: String,
});

export default mongoose.models.CheonanCampus || mongoose.model('CheonanCampus', cheonanCampusSchema, 'Weekday');

