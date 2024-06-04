
export default async function handler(req, res) {
  // DB 연결
  await dbConnect();
  console.log('DB Connect.');

  if (req.method === 'POST') {
    // 1. 새로운 토큰 객체 생성
    const newToken = new Token({ Token: req.body.token.value.data });

    // 2. DB에 똑같은 토큰이 있을시 필터 후 저장 X
    const existingToken = await Token.findOne({ Token: req.body.token.value.data });

    if (existingToken) {
      res.status(400).send(`same Token not saved: ${req.body.token.value.data}`);
      return;
    }

    // 3. newToken 저장
    await newToken.save();

    res.status(200).send(`Token saved: ${req.body.token.value.data}`);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
