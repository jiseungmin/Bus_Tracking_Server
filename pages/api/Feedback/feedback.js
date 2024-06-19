import dbConnect from '../../../database/dbconnect';
import FeedBack from '../../../database/models/feedback';

export const config = {
  api: {
    bodyParser: true, // Ensure bodyParser is enabled
  },
};

export default async function handler(req, res) {
  // CORS 설정
  const allowedOrigins = [
    'http://localhost:8081',
    'https://driver-smu.vercel.app',
    'https://student-smu.vercel.app',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // 요청 헤더의 origin을 설정
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // DB 연결
  await dbConnect();
  console.log('DB Connect.');

  if (req.method === 'POST') {
    try {
      // 요청 본문에서 JSON 데이터 파싱
      const { email, userType, content } = req.body;
      const expireAt = new Date();
      expireAt.setMonth(expireAt.getMonth() + 1);

      // 피드백 데이터 생성
      const newFeedback = new FeedBack({
        email,
        userType,
        content,
        expireAt
      });

      // 데이터베이스에 저장
      await newFeedback.save();

      res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET'){
    const Reviews = await FeedBack.find({});
    console.log(Reviews)
    res.status(200).json(Reviews);
  }else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
