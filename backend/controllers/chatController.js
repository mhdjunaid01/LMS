// controllers/chatController.js
import ChatRoom from "../models/ChatRoom.js";
import ChatMessage from "../models/ChatModel.js";
import mongoose from "mongoose";
import { console } from "inspector";

// 1. Access or create a private chat between two users
export const accessChat = async (req, res) => {
  const userId1 = req.user.id;
  const userId2 = req.body.userId;

  if (!userId2) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // Find an existing chat room between these users
    let room = await ChatRoom.findOne({
      isGroup: false,
      participants: { 
        $all: [
          mongoose.Types.ObjectId.isValid(userId1) ? userId1 : new mongoose.Types.ObjectId(userId1),
          mongoose.Types.ObjectId.isValid(userId2) ? userId2 : new mongoose.Types.ObjectId(userId2)
        ] 
      },
    }).populate("participants", "userName name email");

    // If no room exists, create one
    if (!room) {
      room = await ChatRoom.create({
        isGroup: false,
        participants: [userId1, userId2],
        createdBy: userId1,
      });
      
      // Immediately populate the new room to return consistent data
      room = await ChatRoom.findById(room._id)
        .populate("participants", "userName name email");
      
      // Emit socket event for new chat
      const io = req.app.get("io");
      if (io) {
        const roomData = {
          ...room.toObject(),
          isNew: true
        };
        
        room.participants.forEach(user => {
          io.to(user.id.toString()).emit("chat created", roomData);
        });
      }
    }

    res.status(200).json(room);
  } catch (err) {
    console.error("accessChat error:", err);
    res.status(500).json({ error: "Failed to access or create chat" });
  }
};

// Fetch all chats (private & group) for the current user
export const fetchChats = async (req, res) => {
  const userId = req.user.id;

  try {
    const rooms = await ChatRoom.find({
      $or: [
        { isGroup: true, members: userId },
        { isGroup: false, participants: userId },
      ]
    })
    .populate("participants", "userName name email")
    .populate("members", "userName name email")
    .populate("createdBy", "userName name")
    .sort({ updatedAt: -1 });

    res.status(200).json(rooms);
  } catch (err) {
    console.error("fetchChats error:", err);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

//Create a new group chat (instructor only)
export const createGroupChat = async (req, res) => {
    const { name, members } = req.body; // Changed from memberIds to members to match frontend
    const createdBy = req.user.id;
  
    if (!name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: "Group name and at least one member are required" });
    }
  
    try {
      // Ensure current user is included in members if not already
      const allMembers = [...new Set([...members, createdBy])];
      
      const room = await ChatRoom.create({
        name,
        isGroup: true,
        members: allMembers,
        createdBy,
      });
      
      // Populate the new room with member details
      const populatedRoom = await ChatRoom.findById(room._id)
        .populate("members", "userName name email")
        .populate("createdBy", "userName name");
      
      // Emit socket event for new group chat
      const io = req.app.get("io");
      if (io) {
        const roomData = {
          ...populatedRoom.toObject(),
          isNew: true
        };
        
        // Notify all members including the creator
        allMembers.forEach(memberId => {
          io.to(memberId.toString()).emit("chat created", roomData);
        });
      }
  
      res.status(201).json(populatedRoom);
    } catch (err) {
      console.error("createGroupChat error:", err);
      res.status(500).json({ 
        error: "Failed to create group chat",
        details: err.message 
      });
    }
  };

//  Send a message into a chat room
export const sendMessage = async (req, res) => {
  try {
    // Make sure we have a valid user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    
    const senderId = req.user.id;
    const { chatId, content } = req.body;

    // Validate required fields
    if (!chatId || !content) {
      return res.status(400).json({ error: "chatId and content are required" });
    }
    
    // Check that the chat room exists
    const chatRoom = await ChatRoom.findById(chatId);
    if (!chatRoom) {
      return res.status(404).json({ error: "Chat room not found" });
    }
    
    // Ensure the sender is a valid ObjectId
    const validSenderId = mongoose.Types.ObjectId.isValid(senderId) 
      ? senderId 
      : new mongoose.Types.ObjectId(senderId);
      
    // Check that the user is a member of this chat
    const isParticipant = chatRoom.isGroup 
      ? chatRoom.members.some(id => id.toString() === validSenderId.toString())
      : chatRoom.participants.some(id => id.toString() === validSenderId.toString());
      
    if (!isParticipant) {
      return res.status(403).json({ error: "User is not a member of this chat" });
    }

    // Create the new message with validated sender ID
    const message = await ChatMessage.create({
      chatRoom: chatId,
      sender: validSenderId,
      message: content
    });
    
    // Populate sender details
    const populatedMessage = await ChatMessage.findById(message._id)
      .populate("sender", "userName name email");

    // Update room's updatedAt
    await ChatRoom.findByIdAndUpdate(
      chatId, 
      { updatedAt: Date.now() }, 
      { new: true }
    );

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error("sendMessage error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// 5. Fetch all messages for a given chat room
export const fetchMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await ChatMessage.find({ chatRoom: chatId })
      .populate("sender", "userName name email")
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("fetchMessages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};