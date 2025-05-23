import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const registerInstructor = async (req, res) => {
  try {
    const { userName, email, password,phoneNumber } = req.body;

    if (!userName || !email || !password || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }, { phoneNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
      }
      if (existingUser.userName === userName) {
      return res
        .status(400)
        .json({ message: "Username already taken", success: false });
      }
      if (existingUser.phoneNumber === phoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number already in use", success: false });
      }
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newInstructor = new User({
      userName,
      email,
      phoneNumber,
      password: hashpassword,
      role: "instructor",
    });
    await newInstructor.save();
    res.status(201).json({
      message: "Instructor added successfully",
      success: true,
      instructor: {
        _id: newInstructor._id,
        userName: newInstructor.userName,
        email: newInstructor.email,
        phoneNumber: newInstructor.phoneNumber,
        role: newInstructor.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const registerStudent = async (req, res) => {
  try {
    console.log(req.body);
    
    const { userName, email, password, phoneNumber } = req.body;

    // Validate required fields
    if (!userName || !email || !password, !phoneNumber) {
      return res.status(400).json({
        message: 'userName, email,phoneNumber and password are required',
        success: false
      });
    }
    
    // Check if the email is null or empty
    if (email === null || email.trim() === "") {
      return res.status(400).json({
        message: 'Email cannot be empty',
        success: false
      });
    }
    
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }, { phoneNumber}],
    });

    if (existingUser) {
      if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
      }
      if (existingUser.userName === userName) {
      return res
        .status(400)
        .json({ message: "Username already taken", success: false });
      }
      if (existingUser.phoneNumber === phoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number already in use", success: false });
      }
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newStudent = new User({
      userName,
      email,
      phoneNumber,
      password: hashpassword,
      role: "student",
      isEnrolled: false,

    });

    await newStudent.save();

    res.status(201).json({
      message: "student added successfully",
      success: true,
      student: {
        _id: newStudent._id,
        userName: newStudent.userName,
        email: newStudent.email,
        phoneNumber: newStudent.phoneNumber,
        role: newStudent.role,
      },

    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const {  email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    if (email === user.email && isValidPassword) {
      const token = jwt.sign(
        {
          id: user.id,
          userName: user.userName,
          email: user.email,
          phoneNumber:user.phoneNumber,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "120m" }
      );

      // store token in http-Only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 120 * 60 * 1000,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax", 
      });
      res.json({
        message: "Logged in successfully",
        success: true,
        data: {
          user: {
            id: user.id,
            userName: user.userName,
            email: user.email,
            phoneNumber:user.phoneNumber,
            role: user.role,
          },
          token,
        },
        
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
    });
    res.status(200).json({ message: 'Token removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
export { registerInstructor, registerStudent, login ,logout};
