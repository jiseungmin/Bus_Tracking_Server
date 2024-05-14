import mongoose from 'mongoose';

const  cheonanAsanStationscheduleEntrySchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  CheonanTerminalStation: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String,
});
const cheonanAsanStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanAsanStation: [cheonanAsanStationscheduleEntrySchema]
});
export default mongoose.models.CheonanAsanStation || mongoose.model('CheonanAsanStation', cheonanAsanStationSchema, 'Weekday');
