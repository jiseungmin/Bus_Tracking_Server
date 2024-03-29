import mongoose, { Document, Schema } from 'mongoose';

// スケジュール情報のインターフェースを定義します。
interface IBusSchedule extends Document {
  scheduleId: number;
  AsanCampusDeparture: string | null;
  TerminalArrival: string;
  DoojeongMcDonaldsDeparture: string;
  HomeMartEveryDayDeparture: string;
  SeoulNationalUniversityHospitalDeparture: string;
  AsanCampusArrival: string;
  isFridayDriving: boolean;
  status: 'driving' | 'notDriving';
}

// Mongooseスキーマを定義します。
const busScheduleSchema: Schema = new Schema({
  scheduleId: { type: Number, required: true },
  AsanCampusDeparture: { type: String, default: null },
  TerminalArrival: { type: String, required: true },
  DoojeongMcDonaldsDeparture: { type: String, required: true },
  HomeMartEveryDayDeparture: { type: String, required: true },
  SeoulNationalUniversityHospitalDeparture: { type: String, required: true },
  AsanCampusArrival: { type: String, required: true },
  isFridayDriving: { type: Boolean, required: true },
  status: { type: String, enum: ['driving', 'notDriving'], required: true }
}, {
  timestamps: true
});
// `CheonanTerminalStation` モデルがすでに存在するか確認し、なければ新しく作成します。
const CheonanTerminalStation = mongoose.models.Weekday as mongoose.Model<IBusSchedule>|| mongoose.model<IBusSchedule>('Weekday', busScheduleSchema,"Weekday");
// const CheonanTerminalStation = mongoose.models.URLDATA as mongoose.Model<INews> || mongoose.model<INews>('URLDATA', NewsSchema, "URLDATA");

export default CheonanTerminalStation;
