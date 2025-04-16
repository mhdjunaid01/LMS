import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/utils/axiosInstance";

function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      const res = await axiosInstance.post("/openai/chat", {
        message: input,
      });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "bot",
        text: "Error connecting to ChatGPT",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Chat with ChatBot
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[32rem] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  } max-w-2xl whitespace-pre-wrap`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-200 text-gray-800 max-w-xs">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                  ></svg>
                  Loading...
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 rounded-b">
          <div className="flex items-center space-x-2 w-full">
            <Textarea
              className="flex-grow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <Button onClick={handleSend} disabled={loading}>
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChatBot;
