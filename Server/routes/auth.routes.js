import express from "express";
import { googleAuth,currentUser,logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes
router.post("/google", googleAuth); 
router.post("/logout", logout);
router.get("/user", authMiddleware, currentUser);

export default router;
