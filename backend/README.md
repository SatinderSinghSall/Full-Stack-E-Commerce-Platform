# Backend – Wholesale Full-Stack E-Commerce Platform

This is the **backend API** for the Wholesale Full-Stack E-Commerce Platform.  
It is built using **Node.js, Express, MongoDB**, and handles authentication, products, cart, orders, payments, and admin operations.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – MongoDB ODM
- **JWT (JSON Web Token)** – Authentication
- **bcrypt** – Password hashing
- **Cloudinary** – Image storage
- **Multer** – File uploads
- **Stripe** – Online payments
- **Razorpay** – Online payments (India)
- **dotenv** – Environment variable management
- **CORS** – Cross-origin requests

---

## 📁 Folder Structure

```

backend/
├── config/
│ ├── cloudinary.js # Cloudinary configuration
│ └── mongodb.js # MongoDB connection
│
├── controllers/
│ ├── cartController.js # Cart logic
│ ├── orderController.js # Orders & payments
│ ├── productController.js # Products CRUD
│ └── userController.js # Auth & user profile
│
├── middleware/
│ ├── adminAuth.js # Admin authentication
│ ├── auth.js # User authentication
│ └── multer.js # File upload handling
│
├── models/
│ ├── orderModel.js
│ ├── productModel.js
│ └── userModel.js
│
├── routes/
│ ├── cartRoute.js
│ ├── orderRoute.js
│ ├── productRoute.js
│ └── userRoute.js
│
├── server.js # Express app entry point
├── package.json
└── vercel.json # Deployment config

```

---

## 🔐 Authentication

- **JWT-based authentication**
- Token is sent via request headers:

```

headers: {
token: <JWT_TOKEN>
}

```

- Middleware:
- `auth.js` → protects user routes
- `adminAuth.js` → protects admin routes

---

## 🧑‍💻 API Endpoints

### 🔑 User Routes (`/api/user`)

| Method | Endpoint    | Description                |
| ------ | ----------- | -------------------------- |
| POST   | `/register` | Register a new user        |
| POST   | `/login`    | User login                 |
| POST   | `/admin`    | Admin login                |
| GET    | `/profile`  | Get logged-in user profile |

---

### 🛍 Product Routes (`/api/product`)

| Method | Endpoint  | Description            |
| ------ | --------- | ---------------------- |
| POST   | `/add`    | Add product (Admin)    |
| GET    | `/list`   | Get all products       |
| POST   | `/single` | Get single product     |
| POST   | `/remove` | Delete product (Admin) |
| POST   | `/update` | Update product (Admin) |

---

### 🛒 Cart Routes (`/api/cart`)

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| POST   | `/add`    | Add to cart      |
| POST   | `/remove` | Remove from cart |
| POST   | `/get`    | Get cart data    |

---

### 📦 Order Routes (`/api/order`)

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| POST   | `/place`          | Place COD order             |
| POST   | `/stripe`         | Place Stripe order          |
| POST   | `/razorpay`       | Place Razorpay order        |
| POST   | `/verifyStripe`   | Verify Stripe payment       |
| POST   | `/verifyRazorpay` | Verify Razorpay payment     |
| POST   | `/userorders`     | Get user orders             |
| POST   | `/list`           | Get all orders (Admin)      |
| POST   | `/status`         | Update order status (Admin) |

---

## 💳 Payment Integration

### Stripe

- Used for international payments
- Redirect-based checkout
- Payment verification handled server-side

### Razorpay

- Used for Indian payments
- Order verification via Razorpay API

---

## 🖼 Image Uploads

- **Multer** handles file uploads
- Images stored securely in **Cloudinary**
- Supports multiple images per product

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## ▶️ Running the Backend Locally

```bash
cd backend
npm install
npm start
```

Server will start on:

```
http://localhost:4000
```

---

## 🚀 Deployment

- Ready for **Vercel / Render / Railway**
- `vercel.json` included for serverless deployment
- Uses environment variables for production safety

---

## ✅ Features Summary

- User authentication & authorization
- Admin dashboard support
- Product management (CRUD)
- Cart system
- Order management
- Stripe & Razorpay payments
- Secure image uploads
- Clean MVC architecture

---

## 📌 Notes

- Frontend and Admin panel are separate projects
- Backend is fully API-driven
- Designed for scalability and real-world usage

---

### 👨‍💻 Author

**Satinder Singh Sall**
