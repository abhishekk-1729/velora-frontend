import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import endpoints from "../../configs/apiConfigs";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  const [aiMessages, setAiMessages] = useState([]);
  const [humanMessages, setHumanMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCurrentResponse, setAiCurrentResponse] = useState("");
  const [humanLoading, setHumanLoading] = useState(false);
  const [humanCurrentResponse, setHumanCurrentResponse] = useState("");
  const socket = io("https://www.backend.thefirstweb.com");
  // const socket = io("http://localhost:8000");
  const [chatId, setChatId] = useState(null);
  const [showQuickQuestionsAi, setShowQuickQuestionsAi] = useState(true);
  const [showQuickQuestionsHuman, setShowQuickQuestionsHuman] = useState(true);

  const dummyQuestions = [
    "What services do you offer?",
    "How much does it cost to build a website?",
    "Can I customize my website?",
  ];

  const sendMessage = (message=null) => {
    console.log(input);
    console.log(chatId);
    console.log(message)
    console.log(input)
    const input1 = input.trim() || message
    console.log(input1)
    if (!input1.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      sender: "user",
      message: input1,
    });
    setInput("");
  };

  const handleSendMessage = async (e, message = null) => {
    e?.preventDefault();
    const userInput = message || input.trim();

    if (userInput) {
      const newMessage = {
        type: "user",
        text: userInput,
        time: new Date().toLocaleString(),
      };

      if (activeTab === "ai") {
        // Add message to AI chat only
        setAiMessages((prev) => [...prev, newMessage]);
        handleAiResponse(userInput);
        setShowQuickQuestionsAi(false); // Hide quick questions on message send
      } else if (activeTab === "human") {
        sendMessage(message);
        setShowQuickQuestionsHuman(false); // Hide quick questions on message send
      }

      if (!message) setInput("");
    }
  };

  const handleAiResponse = async (userInput) => {
    setAiLoading(true);
    setAiCurrentResponse("");
    try {
      const response = await fetch(endpoints.getChatAnswer, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });
      const data = await response.json();
      const aiResponse = data?.response || "Sorry, I couldn't process that.";
      animateTyping(aiResponse, "ai");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      animateTyping("Sorry, something went wrong.", "ai");
    } finally {
      setAiLoading(false);
    }
  };

  const animateTyping = (response, tab) => {
    const words = response.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        if (tab === "ai") {
          setAiCurrentResponse((prev) => prev + " " + words[index]);
        } else if (tab === "human") {
          setHumanCurrentResponse((prev) => prev + " " + words[index]);
        }
        index++;
      } else {
        clearInterval(interval);
        const finalMessage = {
          type: tab,
          text: response,
          time: new Date().toLocaleString(),
        };

        if (tab === "ai") {
          setAiMessages((prev) => [...prev, finalMessage]);
          setAiCurrentResponse("");
        } else if (tab === "human") {
          setHumanMessages((prev) => [...prev, finalMessage]);
          //   setHumanCurrentResponse("");
        }
      }
    }, 150);
  };

  const startChat = async () => {
    if (!chatId) {
      console.log("new chat");
      try {
        const response = await fetch(
          endpoints.chatStart,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: "guest" }),
          }
        );
        const data = await response.json();
        setChatId(data.chatId);
        socket.emit("joinChat", data.chatId);
        socket.on("newMessage", (message) => {
          setHumanMessages((prev) => [...prev, message]);
        });
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4" style={{ zIndex: 200 }}>
      {!isOpen && (
        <div
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-center cursor-pointer shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          Help & Support
        </div>
      )}
      {isOpen && (
        <div
          className="w-80 md:w-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col"
          style={{ height: "600px" }}
        >
          <div className="flex justify-between items-center border-b border-gray-300 p-3">
            <h2 className="text-lg font-semibold text-blue-500">
              Chat Assistant
            </h2>
            <button
              className="text-gray-500 text-lg focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="flex justify-around border-b border-gray-300 p-3">
            <div
              className={`cursor-pointer px-3 py-1 ${
                activeTab === "ai"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("ai")}
            >
              AI Chat
            </div>
            <div
              className={`cursor-pointer px-3 py-1 ${
                activeTab === "human"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("human");
                startChat();
              }}
            >
              Human Chat
            </div>
          </div>

          {activeTab === "ai" && showQuickQuestionsAi && (
            <div className="p-3 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Quick Questions:
              </h3>
              <div className="flex flex-wrap gap-2">
                {dummyQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="bg-gray-100 text-blue-500 px-2 py-1 rounded-lg text-sm hover:bg-blue-500 hover:text-white"
                    onClick={(e) => handleSendMessage(e, question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "human" && showQuickQuestionsHuman && (
            <div className="p-3 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Quick Questions:
              </h3>
              <div className="flex flex-wrap gap-2">
                {dummyQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="bg-gray-100 text-blue-500 px-2 py-1 rounded-lg text-sm hover:bg-blue-500 hover:text-white"
                    onClick={(e) => handleSendMessage(e, question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            className="flex-grow p-3 overflow-y-auto"
            style={{
              height:
                (activeTab === "ai" && showQuickQuestionsAi) ||
                (activeTab === "human" && showQuickQuestionsHuman)
                  ? "400px"
                  : "450px",
            }}
          >
            {activeTab === "ai"
              ? aiMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    } items-start mb-2`}
                  >
                    {message.type === "ai" && (
                      <span className="text-2xl mr-2">🤖</span>
                    )}
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs text-gray-400 block text-right mt-1">
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))
              : humanMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } items-start mb-2`}
                  >
                    {/* message.type === "human" && */}
                    {/* { (
                      <img
                        src="/human-icon.png"
                        alt="Human"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )} */}
                    {/* {message.sender === "admin"?<span className="text-2xl mr-2">🧑</span>:<></>}
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm">{message.message}</p>
                      <span className="text-xs text-gray-400 block text-right mt-1">
                        {"12:11"}
                      </span>
                    </div> */}
                    <div className="flex items-start">
                      {message.sender === "admin" ? (
                        <img
                          src="/founder.jpeg"
                          alt="Admin"
                          className="w-10 h-10 rounded-full mr-2 object-cover object-center"
                        />
                      ) : null}
                      <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs text-gray-400 block text-right mt-1">
                          {"12:11"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            {activeTab === "ai" && (
              <>
                {aiLoading && (
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-2">🤖</span>
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-500">Typing...</p>
                    </div>
                  </div>
                )}
                {aiCurrentResponse && (
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-2">🤖</span>
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm">{aiCurrentResponse}</p>
                    </div>
                  </div>
                )}
              </>
            )}
            {/* {activeTab === "human" && (
              <>
                {humanLoading && (
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-2">🧑</span>
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-500">Typing...</p>
                    </div>
                  </div>
                )}
                {humanCurrentResponse && (
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-2">🧑</span>
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm">{humanCurrentResponse}</p>
                    </div>
                  </div>
                )}
              </>
            )} */}
          </div>

          <form
            className="border-t border-gray-300 p-3 flex items-center space-x-2"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
