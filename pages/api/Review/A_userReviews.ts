// pages/api/Review/A_userReviews.ts
import dbConnect from '@/database/dbconnect';
import userReviews from '@/database/models/Review/M_userReviews';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @description Review コレクションの全データを取得
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log('Database connected');

  try {
    const Reviews = await userReviews.find({});
    console.log('Reviews fetched:', Reviews);
    res.status(200).json(Reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
}
