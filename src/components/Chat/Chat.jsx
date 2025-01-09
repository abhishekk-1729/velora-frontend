import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import endpoints from "../../configs/apiConfigs";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import SmoothTextSwitcher from "./TextSwitch"

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  const [aiMessages, setAiMessages] = useState([]);
  const [humanMessages, setHumanMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCurrentResponse, setAiCurrentResponse] = useState("");
  // const [humanLoading, setHumanLoading] = useState(false);
  const [humanCurrentResponse, setHumanCurrentResponse] = useState("");
  const socket = io("https://www.backend.thefirstweb.com");
  // const socket = io("http://localhost:8000");
  const [chatId, setChatId] = useState(null);
  const [showQuickQuestionsAi, setShowQuickQuestionsAi] = useState(true);
  const [showQuickQuestionsHuman, setShowQuickQuestionsHuman] = useState(true);
  const navigate = useNavigate();
  const [humanLoading, setHumanLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [humanText, setHumanText] = useState("");
  const [memory, setMemory] = useState(null);

  

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, humanMessages]);
  const dummyQuestions = [
    "What services do you offer?",
    "How much does it cost to build a website?",
    "Can I customize my website?",
  ];

  const sendMessage = (message = null) => {
    console.log(input);
    console.log(chatId);
    console.log(message);
    console.log(input);
    const input1 = input.trim() || message;
    console.log(input1);
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
        body: JSON.stringify({ user_input: userInput, memory: memory }),
      });
      const data = await response.json();
      const data_response = data?.response
      const data_memory = data?.memory
      setMemory(data_memory);
      const aiResponse = data_response || "Sorry, I couldn't process that.";
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
    let currentText = ""; // Temporary variable to manage state
  
    const typeWord = (index) => {
      if (index < words.length) {
        currentText += (currentText ? " " : "") + words[index];
  
        // Update the respective state
        if (tab === "ai") {
          setAiCurrentResponse(currentText);
        } else if (tab === "human") {
          setHumanCurrentResponse(currentText);
        }
  
        // Call the next word after 150ms
        setTimeout(() => typeWord(index + 1), 150);
      } else {
        // When done, save the final message and reset
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
        }
      }
    };
  
    // Start typing from the first word
    typeWord(0);
  };
    const startChat = async () => {
    if (!chatId) {
      console.log("new chat");
      try {
        const response = await fetch(endpoints.chatStart, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "guest" }),
        });
        const data = await response.json();
        setChatId(data.chatId);
        socket.emit("joinChat", data.chatId);
        socket.on("newMessage", (message) => {
          if (message.sender != "admin") {
            setHumanLoading(true);
          } else {
            setHumanLoading(false);
          }
          setHumanMessages((prev) => [...prev, message]);
        });
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-4 md:right-16" style={{ zIndex: 200 }}>
      {!isOpen && (
        <div className="pulsating-button" onClick={() => setIsOpen(true)}>
          Help & Support
        </div>
      )}
      {isOpen && (
        <div
          className="w-80 md:w-96 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col"
          style={{ height: "600px" }}
        >
          <div className="flex justify-between items-center border-b border-gray-300 p-3">
            <h2 className="text-lg font-semibold text-[#783ec7] text-500">
              Chat with us
            </h2>
            <button
              className="text-gray-500 text-lg focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div class="scrolling-banner">
            <span>
              Get 20% OFF with the coupon code FIRSTWEB25. Coupon code is valid
              till Jan 31st, 2025. Go to{" "}
              <button
                className="underline"
                onClick={() => {
                  navigate("/pricing");
                  setIsOpen(false);
                }}
              >
                pricing
              </button>
              {". "}Let's go live today!
            </span>
          </div>

          <div className="flex justify-around border-b border-gray-300 p-3">
            <div
              className={`cursor-pointer px-3 py-1 ${
                activeTab === "ai"
                  ? "border-b-2 border-[#783ec7] border-500 text-[#783ec7] text-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("ai")}
            >
              Ask FirstAI👋
            </div>
            <div
              className={`cursor-pointer px-3 py-1 ${
                activeTab === "human"
                  ? "border-b-2 border-[#783ec7] border-500 text-[#783ec7] text--500"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("human");
                startChat();
              }}
            >
              <SmoothTextSwitcher/>
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
                    className="bg-gray-100 text-[#783ec7] text-500 px-2 py-1 rounded-lg text-sm hover:bg-[#783ec7] hover:bg-500 hover:text-white"
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
                    className="bg-gray-100 text-[#783ec7] text-500 px-2 py-1 rounded-lg text-sm hover:bg-[#783ec7] hover:bg-500 hover:text-white"
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
                      <img
                        src="/robot.png"
                        alt="Admin"
                        className="w-6 h-6  mr-2 object-cover object-center mt-2"
                      />
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
                    <div className="flex items-start">
                      {message.sender === "admin" ? (
                        <img
                          src="/founder.jpeg"
                          alt="Admin"
                          className="w-10 h-10 rounded-full mr-2 object-cover object-center mt-2"
                        />
                      ) : null}
                      <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs text-gray-400 block text-right mt-1">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            {activeTab === "human" &&humanLoading && (
              <>
                <div
                  className={`flex "justify-start"
                  items-start mb-2`}
                >
                  <div className="flex items-center align-items">
                    <img
                      src="/founder.jpeg"
                      alt="Admin"
                      className="w-10 h-10 rounded-full mr-2 object-cover object-center mt-2"
                    />

                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                    <p className="text-sm text-gray-500">
                        <span>
                          <ThreeDots
                            visible={true}
                            height="24"
                            width="24"
                            color="grey"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </span>
                      </p>
                      {/* <span className="text-xs text-gray-400 block text-right mt-1">
                        {new Date().toLocaleString()}
                      </span> */}
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeTab === "ai" && (
              <>
                {aiLoading && (
                  <div className="flex items-start mb-2">
                    <img
                      src="/robot.png"
                      alt="Admin"
                      className="w-6 h-6  mr-2 object-cover object-center mt-2"
                    />
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-500">
                        <span>
                          <ThreeDots
                            visible={true}
                            height="18"
                            width="18"
                            color="grey"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                {aiCurrentResponse && (
                  <div className="flex items-start mb-2">
                    <img
                      src="/robot.png"
                      alt="Admin"
                      className="w-6 h-6  mr-2 object-cover object-center mt-2"
                    />
                    <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                      <p className="text-sm">{aiCurrentResponse}</p>
                    </div>
                  </div>
                )}
              </>
            )}{" "}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="border-t border-gray-300 p-3 flex items-center justify-between gap-2"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#783ec7] focus:ring-500"
              required
            />
            <button
              type="submit"
              className="bg-[#783ec7] bg-500 text-white px-4 py-2 rounded-lg hover:bg-[#783ec7] hover:bg-700 focus:outline-none focus:ring-2 focus:ring-[#783ec7] focus:ring-500"
            >
              Send
            </button>
          </form>
          {activeTab === "ai" && (
            <div className="flex justify-center align-items text-[8px] mx-6 text-center my-2">
              FirstAI Chatbot (powered by GPT-4) is experimental and may provide
              inaccurate or misleading responses. User discretion is advised.
              The First Web cannot be held responsible for any consequences
              arising from the information provided by this bot.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
