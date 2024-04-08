import mongoose from 'mongoose';

const onyangOncheonStationSchema = new mongoose.Schema({
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

export default mongoose.models.OnyangOncheonStation || mongoose.model('OnyangOncheonStation', onyangOncheonStationSchema, 'Weekday');


