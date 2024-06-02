import dbConnect from '../../database/dbconnect';
import Location from '../../database/models/location';

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

  if (req.method === 'GET') {
    try {
      // 모든 Location 문서를 찾기
      const allLocations = await Location.find({});
      console.log(allLocations);
      res.status(200).json({ locations: allLocations });
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
