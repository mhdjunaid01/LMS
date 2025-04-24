import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";

const AskDeepSeek = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "DeepSeek is ready to help. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/deepseek/ask-deepseek", {
        message: input.trim(),
      });

      const botMessage = {
        sender: "bot",
        text: res.data?.reply || "Sorry, I couldn't understand that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "bot",
        text: "Error getting response from DeepSeek.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[600px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Send className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Ask DeepSeek</h1>
            <p className="text-blue-100 text-sm">AI-powered assistant</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <motion.div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 inline-flex space-x-1 items-center">
              <svg
                className="animate-spin h-5 w-5 text-blue-500 mr-2"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Loading...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </motion.div>

      {/* Input Area */}
      <motion.div
        className="border-t border-gray-200 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-end space-x-2">
          <Textarea
            className="resize-none"
            placeholder="Ask DeepSeek anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSend} className="h-10 px-3" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          DeepSeek may produce inaccurate information. Consider verifying important info.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AskDeepSeek;
