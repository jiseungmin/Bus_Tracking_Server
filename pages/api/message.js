// Next.js API Route - pages/api/message.js
import { Expo } from "expo-server-sdk";
import { getTokens } from "../../src/tokenStorage";

const expo = new Expo();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, body } = req.body;
    const savedPushTokens = getTokens();

    let notifications = []; // 알림 객체를 저장할 새 배열
    for (let pushToken of savedPushTokens) {
      if (!Expo.isExpoPushToken(pushToken.data)) {
        console.error(
          `Push token ${pushToken.data} is not a valid Expo push token`
        );
        continue;
      }

      notifications.push({
        to: pushToken.data,
        sound: "default",
        title: title,
        body: body,
        data: { body },
      });
    }

    let chunks = expo.chunkPushNotifications(notifications);

    try {
      for (let chunk of chunks) {
        let receipts = await expo.sendPushNotificationsAsync(chunk); // 비동기 요청을 기다림
        console.log(receipts);
      }
      console.log(
        `Received message, with title: ${title}, notifications: ${JSON.stringify(
          notifications
        )}`
      );
      res.status(200).json({
        message: `Received message, with title: ${title}`,
        notifications,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send notifications" });
    }
  } else {
    // POST가 아닌 다른 HTTP 메소드에 대한 처리
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
