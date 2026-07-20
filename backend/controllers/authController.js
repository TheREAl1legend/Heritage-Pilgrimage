import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import generateToken from "../utils/generateToken.js";

import sendEmail from "../utils/sendEmail.js";

import otpGenerator from "otp-generator";

/* =========================
   REGISTER USER
========================= */

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);

      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    userExists.password = hashedPassword;

    await userExists.save();

    res.status(200).json({
      success: true,

      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    const html = `
      <div style="font-family:sans-serif;padding:20px">
        <h2>Email Verification</h2>

        <p>Your OTP is:</p>

        <h1 style="letter-spacing:5px">${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `;

    try {
      await sendEmail(email, "Your OTP Code", html);
    } catch (error) {
      user.otp = null;
      user.otpExpire = null;
      await user.save();
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "OTP send Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   LOGIN USER
========================= */

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);

      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);

      throw new Error("Invalid email or password");
    }

    res.json({
      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET USER PROFILE
========================= */

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404);

      throw new Error("User not found");
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
