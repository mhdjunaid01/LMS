import { Server } from "socket.io";

const initializeSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);

        socket.on("setup", (userData) => {
            socket.join(userData._id);
            console.log("User joined room:", userData._id);
            socket.emit("connected");
        });

        socket.on("join chat", (roomId) => {
            socket.join(roomId);
            console.log("User joined chat:", roomId);
        });

        socket.on("typing", ({ roomId, senderId }) => {
            socket.to(roomId).emit("typing", senderId);
        });

        socket.on("new message", (message) => {
            const chat = message.chat;

            if (chat.isGroup && chat.members) {
                // For group chats
                chat.members.forEach((member) => {
                    if (member._id !== message.sender._id) {
                        socket.to(member._id).emit("message received", message);
                    }
                });
            } else if (chat.participants) {
                // For private chats
                chat.participants.forEach((user) => {
                    if (user._id !== message.sender._id) {
                        socket.to(user._id).emit("message received", message);
                    }
                });
            }
        });

        socket.on("new chat", (chatData) => {
            // Notify all participants of the new chat
            if (chatData.isGroup && chatData.members) {
                chatData.members.forEach((memberId) => {
                    if (memberId !== socket.id) {
                        socket.to(memberId).emit("chat created", chatData);
                    }
                });
            } else if (chatData.participants) {
                chatData.participants.forEach((userId) => {
                    if (userId !== socket.id) {
                        socket.to(userId).emit("chat created", chatData);
                    }
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });

    return io;
};

export default initializeSocketIO;