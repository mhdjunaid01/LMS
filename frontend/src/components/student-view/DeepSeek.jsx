import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import axiosInstance from "@/utils/axiosInstance";

function AskDeepSeek() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const askDeepSeek = async () => {
    try {
      const response = await axiosInstance.post("/deepseek/ask-deepseek", {
        message: input,
      });
      setReply(response.data.reply);
    } catch (err) {
      console.error("Error calling backend:", err);
      setReply("Error getting response.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Ask DeepSeek</CardTitle>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask DeepSeek..."
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={askDeepSeek}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </CardContent>
      <CardFooter>
        {reply && <p><strong>Reply:</strong> {reply}</p>}
      </CardFooter>
    </Card>
  );
}

export default AskDeepSeek;