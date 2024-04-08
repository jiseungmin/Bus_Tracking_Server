import mongoose from 'mongoose';

const cheonanAsanStationSchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  CheonanTerminalStation: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String,
});

export default mongoose.models.CheonanAsanStation || mongoose.model('CheonanAsanStation', cheonanAsanStationSchema, 'Weekday');
