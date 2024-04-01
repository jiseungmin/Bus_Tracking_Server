import mongoose, { Document, Schema } from "mongoose";

// CheonanTerminalStationスケジュール情報のインターフェースを定義します。
interface ICheonanTerminalStationSchedule {
  scheduleId: number;
  AsanCampusDeparture: string | null;
  TerminalArrival: string;
  DoojeongMcDonaldsDeparture: string;
  HomeMartEveryDayDeparture: string;
  SeoulNationalUniversityHospitalDeparture: string;
  AsanCampusArrival: string;
  isFridayDriving: boolean;
  status: "driving" | "notDriving";
}

interface IScheduleItem {
  scheduleId: number;
  // 他のフィールド定義...
}

// 全体のバススケジュールのインターフェースを定義します。
interface IBusSchedule extends Document {
  // _id: ObjectId;
  schedules: IScheduleItem[];
  _id: Schema.Types.ObjectId;
  AsanCampusDeparture: string | null;
  CheonanTerminalStation?: ICheonanTerminalStationSchedule[];
}

// CheonanTerminalStationスケジュールのスキーマを定義します。
const cheonanTerminalStationScheduleSchema =
  new Schema<ICheonanTerminalStationSchedule>({
    scheduleId: { type: Number, required: true },
    AsanCampusDeparture: { type: String, default: null },
    TerminalArrival: { type: String, required: true },
    DoojeongMcDonaldsDeparture: { type: String, required: true },
    HomeMartEveryDayDeparture: { type: String, required: true },
    SeoulNationalUniversityHospitalDeparture: { type: String, required: true },
    AsanCampusArrival: { type: String, required: true },
    isFridayDriving: { type: Boolean, required: true },
    status: { type: String, enum: ["driving", "notDriving"], required: true },
  });

// バススケジュールのスキーマを定義します。
const busScheduleSchema: Schema<IBusSchedule> = new Schema(
  {
    AsanCampusDeparture: { type: String, default: null },
    CheonanTerminalStation: {
      type: [cheonanTerminalStationScheduleSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// `CheonanTerminalStation` モデルを定義します。
const CheonanTerminalStation =
  (mongoose.models.Weekday as mongoose.Model<IBusSchedule>) ||
  mongoose.model<IBusSchedule>("Weekday", busScheduleSchema, "Weekday");
export default CheonanTerminalStation;
