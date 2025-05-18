import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [room, setRoom] = useState("text-therapy-room");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const username = sessionStorage.getItem("username") || "USER";
  const role = sessionStorage.getItem("role") || "user";

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      room,
      author: username.toUpperCase(),
      role,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Text-Based Therapy Chat</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.author === username.toUpperCase() ? "own" : "other"}`}
          >
            <div className="message-meta">
              <span className="author">{msg.author}</span>
              <span className="time">{msg.time}</span>
            </div>
            <div className="text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
