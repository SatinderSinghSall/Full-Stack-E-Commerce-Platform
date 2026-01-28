import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  getUserCount,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.get("/count", adminAuth, getUserCount);

userRouter.get("/list", adminAuth, async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default userRouter;
