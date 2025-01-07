import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const AdminChat = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const socket = io("http://localhost:8000");

  // Fetch active chats on mount
  useEffect(() => {
    socket.emit("getActiveChats");

    socket.on("activeChats", (chats) => {
      setActiveChats(chats);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch chat history when a chat is selected
  const handleChatSelection = (selectedChatId) => {
    setChatId(selectedChatId);
    socket.emit("joinChat", selectedChatId); // Optionally, use this if needed to notify server
    socket.emit("getChatHistory", selectedChatId); // Request chat history
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });
  };



  // Send message to the selected chat room
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      chatId,
      message: input,
      sender: "admin", // You can specify the sender as 'admin'
    };

    socket.emit("adminSendMessage", {
      chatId,
      message: input,
    });

    setInput(""); // Clear input after sending
  };

  return (
    <div className="admin-chat-container bg-gray-100 border rounded-lg p-4">
      {/* Chat room selection */}
      <div className="chat-room-selection mb-4">
        <h3>Active Chats</h3>
        {activeChats.map((chat, index) => (
          <button
            key={index}
            onClick={() => handleChatSelection(chat)}
            className="select-chat-btn p-2 bg-blue-500 text-white rounded-lg mb-2"
          >
            Chat Room {chat}
          </button>
        ))}
      </div>

      {/* Display messages */}
      <div className="chat-messages overflow-y-auto mb-4 h-64">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message p-2 mb-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-red-500 text-white text-left"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Admin message input */}
      <div className="chat-input flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-box flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={()=>{sendMessage()}}
          className="send-button bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
