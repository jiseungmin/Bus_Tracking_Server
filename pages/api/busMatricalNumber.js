import dbConnect from '../../database/dbconnect';
import driverModel from "../../database/models/drivers/M_driver"; // 모델 파일의 경로를 지정하세요

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers

  // DB 연결
  await dbConnect();
  console.log('DB Connect.');

  if (req.method === 'GET') {
    try {
      // 드라이버 데이터 조회
      const drivers = await driverModel.find();

      // 모든 Driverdata의 Platenumber만 추출
      const plateNumbers = drivers.flatMap(driver => 
        driver.Driverdata.map(data => data.Platenumber)
      );

      res.status(200).json(plateNumbers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch driver data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
