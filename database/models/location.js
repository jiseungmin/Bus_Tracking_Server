import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    busorder: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    station: { type: String, required: true },
    busTime: { type: String, required: true },
    busNumber: { type: String, required: true },
    expireAt: {
      type: Date,
      required: true,
      index: { expires: '1m' }, // 1분 후에 문서를 삭제
    },
  },
  {
    timestamps: true,
  }
);

var Location = mongoose.models.Location || mongoose.model('Location', LocationSchema, 'Location');

export default Location;
