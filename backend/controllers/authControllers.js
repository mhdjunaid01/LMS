import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const registerInstructor = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
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

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
    }

    const existingUserName = await User.findOne({ userName });

    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "Username already taken", success: false });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newInstructor = new User({
      userName,
      email,
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
    
    const { userName, email, password } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: 'userName, email, and password are required',
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
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newStudent = new User({
      userName,
      email,
      password: hashpassword,
      role: "student",
      isEnrolled: false,

    });

    await newStudent.save();

    res.status(201).json({
      message: "student added successfully",
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, email } = req.body;
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
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "120m" }
      );

      // store token in http-Only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 120 * 60 * 1000,
        secure: true,
        sameSite: "strict",
      });
      res.json({
        message: "Logged in successfully",
        success: true,
        data: {
          user: {
            id: user.id,
            userName: user.userName,
            email: user.email,
            role: user.role,
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export { registerInstructor, registerStudent, login };
