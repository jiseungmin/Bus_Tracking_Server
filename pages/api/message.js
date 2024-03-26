// Next.js API Route - pages/api/message.js
import { Expo } from 'expo-server-sdk';
import { getTokens } from "../../src/tokenStorage";

const expo = new Expo();

export default function handler(req, res) {
  
  if (req.method === 'POST') {
    const { title, body } = req.body;
    const savedPushTokens = getTokens();
   
    let notifications = []; // 알림 객체를 저장할 새 배열
    for (let pushToken of savedPushTokens) {
      if (!Expo.isExpoPushToken(pushToken.data)) {
        console.error(`Push token ${pushToken.data} is not a valid Expo push token`);
        continue;
      }

      notifications.push({
        to: pushToken.data,
        sound: "default",
        title: title,
        body: body,
        data: { body }
      });

    }

    let chunks = expo.chunkPushNotifications(notifications);

    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();
    
    console.log(`Received message, with title: ${title}, notifications: ${JSON.stringify(notifications)}`);
    res.status(200).json({
        message: `Received message, with title: ${title}`,
        notifications: notifications
      });} else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
