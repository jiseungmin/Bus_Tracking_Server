// import mongoose from 'mongoose';

//   const cheonanStationSchema = new mongoose.Schema({
//     scheduleId: Number,
//     AsanCampusDeparture: String,
//     StationArrival: String,
//     HiRexSpa: String,
//     YongamVillage: String,
//     AsanCampusArrival: String,
//     isFridayDriving: Boolean,
//     status: String,
//   });

// export default mongoose.models.CheonanStation || mongoose.model('CheonanStation', cheonanStationSchema, 'Weekday');


import mongoose from 'mongoose';
export interface ICheonanStationSchedule {
  scheduleId: number;
  AsanCampusDeparture: string;
  StationArrival: string;
  HiRexSpa: string;
  YongamVillage: string;
  AsanCampusArrival: string;
  isFridayDriving: boolean;
  status: "driving" | "notDriving";
}
// スケジュールエントリのスキーマを定義
const scheduleEntrySchema = new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  StationArrival: String,
  HiRexSpa: String,
  YongamVillage: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String
});
// 親ドキュメントのスキーマを定義
const cheonanStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CheonanStation: [scheduleEntrySchema]
});

export default mongoose.models.CheonanStation || mongoose.model('CheonanStation', cheonanStationSchema, 'Weekday');
