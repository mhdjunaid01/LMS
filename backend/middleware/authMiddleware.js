import jwt from "jsonwebtoken";

// Verify Token Middleware

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


  if (!token) return res.status(401).json({ message: "unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //store user info in request
    next();
  } catch (error) {
    res.status(403).json({ message: "invalid Token" });
  }
};

//check role
export const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
  