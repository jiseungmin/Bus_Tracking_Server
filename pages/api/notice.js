import dbConnect from '../../database/dbconnect';
import Notice from '../../database/models/notice';

export default async function handler(req, res) {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
