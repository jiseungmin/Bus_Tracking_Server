// pages/api/someEndpoint.js
import dbConnect from '../../database/dbconnect';
import Bus from '../../database/models/bus';

export default async function handler(req, res) {
  try {
    // 데이터베이스에 연결합니다.
    await dbConnect();

    // 새 Bus 문서를 생성하고 저장합니다.
    const newBus = new Bus({
      status: "ok", // 저장할 데이터
      // 다른 필드도 여기에 추가할 수 있습니다.
    });

    // 데이터베이스에 문서를 저장합니다.
    const savedBus = await newBus.save();

    // 저장된 문서를 응답으로 보냅니다.
    res.status(200).json(savedBus);
  } catch (error) {
    // 에러 처리
    res.status(500).json({ message: error.message });
  }
}