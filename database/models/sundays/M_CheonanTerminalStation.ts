import mongoose from 'mongoose';

// CheonanTerminalStation のスキーマ定義
const cheonanTerminalStationSchema = new mongoose.Schema({
    scheduleId: Number,
    AsanCampusDeparture: String,
    TerminalArrival: String,
    AsanCampusArrival: String,
    isFridayDriving: Boolean,
    status: String,
  });

export default mongoose.models.SundaysCheonanTerminalStation || mongoose.model('SundaysCheonanTerminalStation', cheonanTerminalStationSchema, 'Sunday');