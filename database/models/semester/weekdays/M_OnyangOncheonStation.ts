import mongoose from 'mongoose';

const onyangOncheonStationscheduleEntrySchema= new mongoose.Schema({
  scheduleId: Number,
  AsanCampusDeparture: String,
  JueunApartmentBusStopDeparture: String,
  OnyangOncheonStationStop: String,
  TerminalArrival: String,
  GwongokElementarySchoolBusStop: String,
  AsanCampusArrival: String,
  isFridayDriving: Boolean,
  status: String,
});
const onyangOncheonStationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  OnyangOncheonStation: [onyangOncheonStationscheduleEntrySchema]
});
export default mongoose.models.OnyangOncheonStation || mongoose.model('OnyangOncheonStation', onyangOncheonStationSchema, 'Weekday');


