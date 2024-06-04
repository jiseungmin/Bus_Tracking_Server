// pages/api/Review/A_userReviews.ts
import dbConnect from '@/database/dbconnect';
import userReviews from '@/database/models/Review/M_userReviews';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @description Review
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const Reviews = await userReviews.find({});
    res.status(200).json(Reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
}
