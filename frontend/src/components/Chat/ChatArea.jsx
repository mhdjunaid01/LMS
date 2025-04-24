import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatArea = ({
  activeRoom,
  messages,
  messageText,
  setMessageText,
  typingStatus,
  isLoading,
  error,
  sendMessage,
  handleTyping,
  currentUserId,
  getRecipientName,
  messagesEndRef
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    handleTyping();
  };

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chat Header */}
      <motion.div 
        className="bg-white p-4 border-b shadow-sm sticky top-0 z-10"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
            {getRecipientName(activeRoom).charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-medium text-lg">
              {getRecipientName(activeRoom)}
            </h2>
            {activeRoom.isGroup && (
              <div className="text-xs text-gray-500">
                <span>Created by: {activeRoom.createdBy?.userName || "You"} • </span>
                <span>{activeRoom.members?.length || 0} members</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && !messages.length && (
          <div className="flex justify-center">
            <div className="animate-pulse bg-gray-200 rounded-lg p-4 w-32 text-center">
              Loading...
            </div>
          </div>
        )}
        
        {!isLoading && !messages.length && (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
              <div className="text-5xl mb-2">💬</div>
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, idx) => (
            <MessageBubble 
              key={msg._id || idx}
              message={msg}
              isOwnMessage={msg.sender._id === currentUserId}
              isGroupChat={activeRoom.isGroup}
              index={idx}
            />
          ))}
        </AnimatePresence>

        {typingStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm italic text-gray-500 ml-2 flex items-center"
          >
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "200ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "400ms" }}></div>
            </div>
            {typingStatus}
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {error}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div 
        className="p-4 border-t bg-white sticky bottom-0"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-2">
          <Input 
            className="flex-1 "
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!messageText.trim() || isLoading}
          >
            <Send size={18} />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatArea;