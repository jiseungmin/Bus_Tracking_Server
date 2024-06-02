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

  if (req.method === 'POST') {
    try {
      // 요청 본문에서 JSON 데이터 파싱
      const data = req.body;
      console.log('Request data:', data);

      const { busorder, latitude, longitude, timestamp, station, busTime, busNumber } = data;

      // 기존 데이터 확인
      const existingLocation = await Location.findOne({ busorder, station });

      if (existingLocation) {
        console.log('Existing location found:', existingLocation);
        // 기존 데이터가 있으면 latitude와 longitude 업데이트
        existingLocation.latitude = latitude;
        existingLocation.longitude = longitude;
        existingLocation.expireAt = new Date(Date.now() + 3 * 60 * 1000);
        await existingLocation.save();
        res
          .status(200)
          .json({ message: 'Location updated successfully', location: existingLocation });
      } else {
        // 새로운 데이터 저장
        const newLocation = new Location({
          busorder,
          latitude,
          longitude,
          timestamp,
          station,
          busTime,
          busNumber,
          expireAt: new Date(Date.now() + 3 * 60 * 1000),
        });
        console.log('New location to be saved:', newLocation);
        await newLocation.save();
        console.log('Location saved:', newLocation);
        res.status(201).json({ message: 'Location saved successfully', location: newLocation });
      }
    } catch (error) {
      console.error('Error saving location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
