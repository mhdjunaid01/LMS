
import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    name: { type: String }, // Only for group chats
    isGroup: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], // For group chat
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], // For private chat
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } // Added this field
}, {
    timestamps: true // This automatically handles createdAt and updatedAt
});

export default mongoose.model("ChatRoom", chatRoomSchema);