import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  deleteOrder,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User payments
orderRouter.post("/place", authUser, placeOrder); // COD
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/verifyStripe", authUser, verifyStripe);

// User orders
orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/delete", adminAuth, deleteOrder);

export default orderRouter;
