import mongoose from 'mongoose';

// Driver data のスキーマ定義
const driverDataSchema = new mongoose.Schema({
  DriverName: { type: String, required: true },
  Phonenumber: { type: String, required: true },
  Platenumber: { type: String, required: true },
  Driverid: { type: String, required: true },
});

const driverCollectionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,  // 一意の識別子としてObjectIdを使用
  Driverdata: [driverDataSchema]
});


// モデルのエクスポート
export default mongoose.models.Drivers || mongoose.model('Drivers', driverCollectionSchema, 'drivers');
