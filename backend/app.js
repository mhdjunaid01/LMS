import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoute from "./routes/authRoutes.js";
import courseRoute from "./routes/courseRoute.js";
import enrollRoute from "./routes/enrollmentRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import batchRoute from './routes/batchRoute.js';
import InstructorRoute from './routes/instructorRoute.js'
dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(helmet()); // secure Express apps by setting various HTTP headers
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

//routes
app.use("/auth", authRoute);
app.use("/courses", courseRoute);
app.use("/enroll", enrollRoute);
app.use('/attendance',attendanceRoute)
app.use('/batch',batchRoute)
app.use('/instructor',InstructorRoute)
// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
