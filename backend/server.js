import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load env based on NODE_ENV
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

//!
/*
 To Run Backend:
 - Local Development: npm run dev / .env.development
 - Production: npm start / .env.production
*/
//!

// App Config
const app = express();
const port = process.env.PORT || 4000;

// DB + Services
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`),
);
