import React, { useState } from "react";

export default function SendMessage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 메시지 전송 함수
  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://bus-tracking-server-mu.vercel.app/api/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
          }),
        }
      );

      if (response.ok) {
        // 요청이 성공적으로 처리된 경우
        console.log("Message sent successfully");

        alert("Message sent successfully");
      } else {
        // 서버에서 오류 응답을 받은 경우
        console.error("Failed to send message");
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message", error);
      alert("An error occurred while sending the message");
    }
  };
  return (
    <div>
      <div className="max-w-xl mx-auto my-10">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-extrabold text-3xl text-gray-800 dark:text-white my-4">
            입력해주세요
          </h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <textarea
            placeholder="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-[40vh] px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
            style={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
              lineHeight: "1.5",
            }}
          ></textarea>

          {/* <input
            type="text"
            placeholder="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-[50vh] px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          /> */}

          <button
            onClick={sendMessage}
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
