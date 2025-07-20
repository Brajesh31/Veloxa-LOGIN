import firebaseAdmin from "firebase-admin";
import User from "../models/user.model.js";
import { createToken } from "../utils/jwt.util.js";

export const googleAuth = async (req, res) => {
  try {
    const { auth_token } = req.body;
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(auth_token);
    const uid = decodedToken.uid;

    console.log(uid)
     
    let user = await User.findOne({ uid })
    console.log("user:",user)
    let isNewUser = false;

    if (!user) {
     
      isNewUser = true;
      user = new User({
        name: decodedToken.name || decodedToken.email.split("@")[0],
        imageURL: decodedToken.picture,
        uid: uid,
        email: decodedToken.email
      });
      console.log(user)
      await user.save()
    } else {
     
      user.lastLogin = new Date();
      await user.save();
    }

    // Create JWT token for session management
    const token = createToken(user._id);

    // Send response with token and user details
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: isNewUser ? "Registration successful" : "Login successful",
        user,
        success: true,
        isNewUser,
      });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};


export const currentUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT token middleware
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
