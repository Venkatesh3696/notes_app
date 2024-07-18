import { verify } from "jsonwebtoken";
import { jwtSecret } from "../config"; // Import configuration file (containing secret key)

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = verify(token, jwtSecret);
    req.userId = decoded.userId; // Attach decoded user ID to the request object
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default { verifyToken };
