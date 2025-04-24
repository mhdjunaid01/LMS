// components/MessageBubble.jsx
import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isOwnMessage, isGroupChat, index }) => {
  const messageVariants = {
    initial: { 
      opacity: 0,
      x: isOwnMessage ? 20 : -20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.3,
        delay: index * 0.05 > 1 ? 0 : index * 0.05 // Limit delay for large message loads
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-xs sm:max-w-sm md:max-w-md rounded-lg px-4 py-2
          ${isOwnMessage 
            ? "bg-blue-600 text-white rounded-br-none" 
            : "bg-white border rounded-bl-none"}
          shadow-sm
        `}
      >
        {isGroupChat && !isOwnMessage && (
          <div className="text-xs font-medium mb-1 text-blue-500">
            {message.sender.userName || "Unknown User"}
          </div>
        )}
        <p className="break-words">{message.message || message.content}</p>
        <div className={`text-xs mt-1 ${isOwnMessage ? "text-blue-200" : "text-gray-500"}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;