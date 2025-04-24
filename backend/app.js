import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import authRoute from "./routes/authRoutes.js";
import courseRoute from "./routes/courseRoute.js";
import enrollRoute from "./routes/enrollmentRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import batchRoute from "./routes/batchRoute.js";
import InstructorRoute from "./routes/instructorRoute.js";
import studentRoute from "./routes/studentRoute.js";
import LiveClassAndNotificationRoute from "./routes/LiveClassAndNotificationRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import chatRoutes from "./routes/chatGptRoute.js";
import deepSeekRoute from "./routes/deepSeekRoute.js";
import chatbox from "./routes/chatRoute.js";
import initializeSocketIO from "./src/socket.io/socketIO.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = initializeSocketIO(server);

// Database connection
connectDB();

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.set("io", io);

// Routes
app.use("/auth", authRoute);
app.use("/courses", courseRoute);
app.use("/enroll", enrollRoute);
app.use("/attendance", attendanceRoute);
app.use("/batch", batchRoute);
app.use("/instructor", InstructorRoute);
app.use("/student", studentRoute);
app.use("/live-classes", LiveClassAndNotificationRoute);
app.use("/notifications", notificationRoutes);
app.use("/openai", chatRoutes);
app.use("/deepseek", deepSeekRoute);
app.use("/chat", chatbox);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default { app, io };
