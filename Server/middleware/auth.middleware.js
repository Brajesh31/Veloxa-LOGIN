import { verifyToken } from "../utils/jwt.util.js";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    req.user = decoded;


    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token", success: false });
  }
};
