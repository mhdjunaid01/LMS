import jwt, { decode } from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
      }
      
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
//check role
export const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
  