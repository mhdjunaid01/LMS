import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  chatRoom: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ChatRoom", 
    required: true 
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users", 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Add proper timestamp handling
});

export default mongoose.model("ChatMessage", chatMessageSchema);