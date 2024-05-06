import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);
var Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema, 'Notice');

export default Notice;
