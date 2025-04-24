import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber:{
      type:Number,
      min: 10,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
 
  },
  { timestamps: true }
);
const User = mongoose.model("Users", userSchema);
export default User;
