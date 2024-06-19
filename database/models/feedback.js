import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userType: { type: String, required: true },
    content: { type: String, required: true },
    expireAt: {
      type: Date,
      required: true,
      index: { expires: '1d' }, 
    },
  },
  {
    timestamps: true,
  }
);

var FeedBack = mongoose.models.FeedBack || mongoose.model('FeedBack', FeedbackSchema, 'FeedBack');

export default FeedBack;
