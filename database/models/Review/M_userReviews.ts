import mongoose from 'mongoose';

const userReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  evaluation: Number,
  ReviewContents: String,
  timestamps: Date,
},
{
    collection: 'Review'
});
export default mongoose.models.userReviews || mongoose.model('userReviews', userReviewSchema);
