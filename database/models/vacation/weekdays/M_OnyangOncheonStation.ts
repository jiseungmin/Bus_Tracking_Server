import mongoose from 'mongoose';

const onyangOncheonStationscheduleEntrySchema= new mongoose.Schema({
  scheduleId: Number,//순
  AsanCampusDeparture: String,//아산캠퍼스(출발)
  JueunApartmentBusStop: String,//주은아파트버스정류장
  OnyangOncheonStation: String,//온양온천역
  AsanTerminal: String,//아산터미널
  KwonGokElementarySchoolBusStop: String,//권곡초 앞 버스정류장
  AsanCampusArrival: String,//아산캠퍼스(도착)
  isFridayDriving: Boolean,//금운행여부
  status: String,
});
const onyangOncheonStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  OnyangOncheonStation: [onyangOncheonStationscheduleEntrySchema]
});
export default mongoose.models.VactionWeekdaysOnyangOncheonStation ||
mongoose.model('VactionWeekdaysOnyangOncheonStation', onyangOncheonStationSchema, 'VactionWeekday');