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

  interface ScheduleItem {
    scheduleId: number;
    AsanCampusDeparture: string;
    StationArrival: string;
    HiRexSpa: string;
    YongamVillage: string;
    AsanCampusArrival: string;
    isFridayDriving: boolean;
    status: string;
    [key: string]: any; // 任意の文字列キーを受け入れる
  }

  export interface StationData {
    _id: string;
    CheonanStation: ScheduleItem[];
  }

export default mongoose.models.CheonanStation || mongoose.model('CheonanStation', cheonanStationSchema, 'Weekday');
