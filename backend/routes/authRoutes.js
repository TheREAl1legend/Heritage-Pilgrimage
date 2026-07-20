import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  sendOTP,
  verifyOTP,
  updatePassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

router.put("/updatePassword", updatePassword);

export default router;
