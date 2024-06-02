import dbConnect from '../../database/dbconnect';
import Location from '../../database/models/location';

export const config = {
  api: {
    bodyParser: true, // Ensure bodyParser is enabled
  },
};

export default async function handler(req, res) {
  // CORS 설정
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change this to your client URL
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
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
