import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import productModel from "../models/productModel.js";

// globals
const currency = "inr";
const deliveryCharge = 10;

// Stripe (safe – only errors if you call it)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/* ===========================
   PLACE ORDER (COD)
=========================== */
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const detailedItems = [];

    for (const cartItem of items) {
      const product = await productModel.findById(cartItem._id);
      if (!product) continue;

      detailedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: cartItem.quantity,
      });
    }

    const newOrder = new orderModel({
      userId,
      items: detailedItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   STRIPE
=========================== */
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const { origin } = req.headers;

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.userId;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   USER ORDERS
=========================== */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   ADMIN
=========================== */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  userOrders,
  allOrders,
  updateStatus,
};
