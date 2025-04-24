// App.jsx - Main component
import React, { useEffect, useState, useContext, useRef } from "react";
import socket from "../../socket/socket.js";
import axiosInstance from "@/utils/axiosInstance.js";
import { AuthContext } from "@/context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Chat/Sidebar.jsx";
import ChatArea from "@/components/Chat/ChatArea.jsx";
import EmptyState from "@/components/Chat/EmptyState.jsx";
import { toast} from "sonner";

const ChatRoom = () => {
  const { auth } = useContext(AuthContext);
  const currentUserId = auth?.user?.id;
  const messagesEndRef = useRef(null);

  // State
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat rooms
  useEffect(() => {
    if (!currentUserId) return;

    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/chat/fetchChats");
        setChatRooms(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching chat rooms:", err);
        setError("Failed to load your chats");
        toast.error("Failed to load your chats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [currentUserId]);

  // Socket.IO listeners
  useEffect(() => {
    if (!currentUserId) return;

    // Setup connection
    socket.emit("setup", { _id: currentUserId });

    // Message reception handler
    const handleNewMessage = (newMsg) => {
      if (activeRoom && newMsg.chat._id === activeRoom._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    // Typing indicator handler
    const handleTyping = (senderId) => {
      if (senderId !== currentUserId) {
        setTypingStatus("Typing...");
        setTimeout(() => setTypingStatus(""), 1000);
      }
    };

    // New chat created handler
    const handleNewChat = (newChat) => {
      setChatRooms((prevRooms) => {
        const exists = prevRooms.some((room) => room._id === newChat._id);
        if (exists) return prevRooms;
        return [newChat, ...prevRooms];
      });
    };

    // Register event listeners
    socket.on("message received", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("chat created", handleNewChat);

    // Cleanup listeners on unmount
    return () => {
      socket.off("message received", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("chat created", handleNewChat);
    };
  }, [currentUserId, activeRoom]);

  // Emit typing event
  const handleTyping = () => {
    if (!activeRoom) return;
    socket.emit("typing", { roomId: activeRoom._id, senderId: currentUserId });
  };

  // Private chat
  const startPrivateChat = async (recipientId) => {
    if (!recipientId) return;

    try {
      setIsLoading(true);
      const { data: room } = await axiosInstance.post("/chat/access", {
        userId: recipientId,
      });

      setChatRooms((prev) => {
        const exists = prev.some((r) => r._id === room._id);
        if (exists) {
          return prev.map((r) => (r._id === room._id ? room : r));
        } else {
          return [room, ...prev];
        }
      });

      joinRoom(room);
      setError(null);
      setIsMobileSidebarOpen(false);
    } catch (err) {
      console.error("Error starting private chat:", err);
      setError("Failed to start chat");
      toast.error("Failed to start chat");
    } finally {
      setIsLoading(false);
    }
  };

  // Group chat
  const createGroupChat = async (groupName, members) => {
    if (!groupName || members.length === 0) return;

    try {
      setIsLoading(true);

      // Include current user in the members array
      const memberIds = [...members];
      if (!memberIds.includes(currentUserId)) {
        memberIds.push(currentUserId);
      }

      const { data: room } = await axiosInstance.post("/chat/group", {
        name: groupName,
        members: memberIds,
        createdBy: currentUserId,
      });

      // Update UI with the new group
      setChatRooms((prev) => [room, ...prev]);
      joinRoom(room);
      setError(null);
      toast.success("Group chat created");
      setIsMobileSidebarOpen(false);
    } catch (err) {
      console.error("Error creating group chat:", err);
      setError(err.response?.data?.error || "Failed to create group chat");
      toast.error(err.response?.data?.error || "Failed to create group chat");
    } finally {
      setIsLoading(false);
    }
  };

  // Join room
  const joinRoom = async (room) => {
    if (!room) return;

    setActiveRoom(room);
    setMessages([]);

    try {
      setIsLoading(true);
      socket.emit("join chat", room._id);

      const { data } = await axiosInstance.get(`/chat/message/${room._id}`);
      setMessages(data);
      setError(null);
      setIsMobileSidebarOpen(false);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  // Get recipient name for display
  const getRecipientName = (room) => {
    if (!room) return "Chat";
    if (room.isGroup)
      return room.name || `Group (${room.members?.length || 0} members)`;

    const otherParticipant = room.participants?.find(
      (p) => p._id !== currentUserId
    );
    return otherParticipant?.userName || otherParticipant?.name || "Chat";
  };

  // Send message
  const sendMessage = async () => {
    if (!messageText.trim() || !activeRoom) return;

    const msgContent = messageText.trim();
    setMessageText("");

    try {
      // Optimistically add message to UI
      const tempMessage = {
        _id: Date.now(),
        sender: {
          _id: currentUserId,
          userName: auth?.user?.userName || "Me",
        },
        message: msgContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, tempMessage]);

      // Send to server
      const { data: newMessage } = await axiosInstance.post("/chat/message", {
        content: msgContent,
        chatId: activeRoom._id,
      });

      // Emit socket event
      socket.emit("new message", {
        chat: activeRoom,
        sender: {
          _id: currentUserId,
          userName: auth?.user?.userName || "Me",
        },
        content: msgContent,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
      toast.error("Failed to send message");
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row h-full bg-gray-50"
    >
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-3 bg-white border-b">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileSidebarOpen || window.innerWidth >= 768) && (
          <Sidebar 
            currentUserId={currentUserId}
            chatRooms={chatRooms}
            activeRoom={activeRoom}
            isLoading={isLoading}
            startPrivateChat={startPrivateChat}
            createGroupChat={createGroupChat}
            joinRoom={joinRoom}
            getRecipientName={getRecipientName}
            isMobile={window.innerWidth < 768}
            closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex-1 flex flex-col h-full overflow-hidden"
      >
        {activeRoom ? (
          <ChatArea
            activeRoom={activeRoom}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            typingStatus={typingStatus}
            isLoading={isLoading}
            error={error}
            sendMessage={sendMessage}
            handleTyping={handleTyping}
            currentUserId={currentUserId}
            getRecipientName={getRecipientName}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <EmptyState />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatRoom;