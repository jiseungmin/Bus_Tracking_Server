import dbConnect from '../../database/dbconnect';
import Notice from '../../database/models/notice';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://student-smu.vercel.app'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  // DB 연결
  await dbConnect();
  console.log('DB Connect.');

  if (req.method === 'POST') {
    const { title, body } = req.body;
    const newNotice = await Notice.findById('663884393239381da72e56dc');
    newNotice.title = title;
    newNotice.content = body;
    await newNotice.save();
    res.status(200).send(newNotice);
  } else if (req.method === 'GET') {
    const newNotice = await Notice.findById('663884393239381da72e56dc');
    res.status(200).send(newNotice);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
