// components/EmptyState.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const EmptyState = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center justify-center h-full bg-gray-50"
    >
      <div className="text-center p-6 max-w-md">
        <motion.div 
          variants={itemVariants}
          className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <MessageCircle size={40} className="text-blue-600" />
        </motion.div>
        
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          No Chat Selected
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 mb-6"
        >
          Select an existing conversation or start a new chat to begin messaging.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-1">Private Chat</h3>
              <p className="text-gray-500">Start a one-on-one conversation with another user</p>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-1">Group Chat</h3>
              <p className="text-gray-500">Create a group to chat with multiple people at once</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyState;