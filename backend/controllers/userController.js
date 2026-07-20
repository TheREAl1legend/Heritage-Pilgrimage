import { OAuth2Client } from "google-auth-library";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash("googlelogin", salt);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
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
    console.error("Google login error:", error);

    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};
