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
    res.status(200).end();
    return;
  }

  // DB 연결
  await dbConnect();
  console.log('DB Connect.');

  if (req.method === 'POST') {
    const session = await Location.startSession();
    session.startTransaction();
    try {
      // 요청 본문에서 JSON 데이터 파싱
      const data = req.body;
      console.log('Request data:', data);

      const { busorder, latitude, longitude, timestamp, station, busTime, busNumber } = data;

      // 기존 데이터 확인 및 잠금
      const existingLocation = await Location.findOne({ busorder, station }).session(session);

      if (existingLocation) {
        console.log('Existing location found:', existingLocation);
        // 기존 데이터가 있으면 latitude와 longitude 업데이트
        existingLocation.latitude = latitude;
        existingLocation.longitude = longitude;
        existingLocation.expireAt = new Date(Date.now() + 3 * 60 * 1000);
        await existingLocation.save({ session });

        await session.commitTransaction();
        session.endSession();

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
        await newLocation.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log('Location saved:', newLocation);
        res.status(201).json({ message: 'Location saved successfully', location: newLocation });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      console.error('Error saving location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
