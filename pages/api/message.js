// Next.js API Route - pages/api/message.js
import { Expo } from 'expo-server-sdk';
import Token from '../../database/models/usertoken';

const expo = new Expo();

export default async function handler(req, res) {  
  if (req.method === 'POST') {
    // 0. Push Notification Title & content 내용을 값을 으로 받음
    const { title, body } = req.body;

    // 1. DB에 모든 토큰 배열에 담기
    const tokens = await Token.find({});
    const tokenValues = tokens.map(token => token.Token);
    console.log("tokenvalue: ", tokenValues)

    // 2. 알림 객체를 저장
    let notifications = [];
    for (let pushToken of tokenValues) {
      console.log("pushToken: ", pushToken)
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      notifications.push({
        to: pushToken,
        sound: "default",
        title: title,
        body: body,
        data: { body }
      });
    }

    // 3. 알림을 청크 단위로 잘라서 넣음 
    let chunks = expo.chunkPushNotifications(notifications);

    // 4. 각 청크를 순회하며 알림 전송 
    try {
        for (let chunk of chunks) {
          let receipts = await expo.sendPushNotificationsAsync(chunk); // 비동기 요청을 기다림
          console.log(receipts);
        }
        console.log(`Received message, with title: ${title}, notifications: ${JSON.stringify(notifications)}`);
        res.status(200).json({message: `Received message, with title: ${title}`, notifications});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send notifications" });
      }
    } else {
      // POST가 아닌 다른 HTTP 메소드에 대한 처리
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}