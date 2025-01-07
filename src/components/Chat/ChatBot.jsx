import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatBot = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = io("http://localhost:8000"); // Replace with your backend URL

  useEffect(()=>{
        const startChat = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/chat/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "guest" }),
        });
        const data = await response.json();
        setChatId(data.chatId);
        socket.emit("joinChat", data.chatId);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();


  },[]);


  const sendMessage = () => {
    console.log(input)
    console.log(chatId)
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      sender: "user",
      message: input,
    });
    setInput("");
  };

  useEffect(() => {
    console.log("hii")
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const closeChat = () => {
    if (chatId) {
      socket.emit("closeChat", chatId); // Notify the server to close the chat
      setChatId(null); // Reset chatId to indicate no active chat
      setMessages([]); // Clear messages
    }
  };

  const startNewChat = async () => {
    // Start a new chat
    await fetch("https://www.backend.thefirstweb.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "guest" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChatId(data.chatId); // Set new chatId
        setMessages([]); // Clear old messages
        socket.emit("joinChat", data.chatId); // Join new chat room
      })
      .catch((error) => console.error("Error starting new chat:", error));
  };

  return (
    <div className="chatbot-container bg-gray-100 border rounded-lg p-4">
      <div className="chat-messages overflow-y-auto mb-4 h-64">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message p-2 mb-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-green-500 text-white text-left"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-box flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="send-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Close Chat Button */}
      <div className="mt-4">
        <button
          onClick={closeChat}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Close Chat
        </button>
      </div>

      {/* Start New Chat Button */}
      <div className="mt-2">
        <button
          onClick={startNewChat}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Start New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
