import mongoose from 'mongoose';

const cheonanStationSchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  StationArrival: String,
  HiRexSpa: String,
  YongamVillage: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String,
});

export default mongoose.models.CheonanStation2 || mongoose.model('CheonanStation', cheonanStationSchema, 'Weekday');
