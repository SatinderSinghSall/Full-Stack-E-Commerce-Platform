# 🛒 Wholesale Cane Baskets – Full-Stack E-Commerce Platform

A complete **full-stack e-commerce web application** built for a wholesale handicraft business.
The platform includes a **customer-facing storefront**, a **secure admin dashboard**, and a **scalable backend API** with authentication, orders, payments, and product management.

---

## 🌐 Live Modules

- **Frontend (Customer Store)** – Browse products, cart, checkout, orders
- **Admin Panel** – Product & order management
- **Backend API** – Authentication, payments, database logic

---

## 🧩 Project Structure

```
wholesale-full-stack/
├── frontend/     → Customer-facing website (React + Tailwind)
├── admin/        → Admin dashboard (React + Shadcn UI)
├── backend/      → REST API (Node.js + Express + MongoDB)
```

---

## 🚀 Tech Stack

### 🖥️ Frontend (Customer Store)

- **React.js (Vite)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **Context API (Global State)**
- **React Toastify**
- **Razorpay / Stripe integration**

### 🛠️ Admin Panel

- **React.js (Vite)**
- **Tailwind CSS**
- **Shadcn/UI**
- **Radix UI**
- **Axios**
- **JWT Authentication**

### ⚙️ Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Bcrypt (Password hashing)**
- **Cloudinary (Image uploads)**
- **Stripe (Payments)**
- **Razorpay (Payments)**
- **Multer (File handling)**
- **Validator.js**

---

## 🔐 Authentication & Security

- JWT-based authentication
- Protected routes using middleware
- Password hashing with bcrypt
- Role-based access (Admin vs User)
- Secure token verification for all orders & payments

---

## 🧑‍💻 Core Features

### 👤 User Features

- User registration & login
- Profile page
- Cart management
- Secure checkout
- Order history
- Cash on Delivery (COD)
- Stripe payments
- Razorpay payments

### 🛍️ Product Features

- Product listing
- Product details
- Related products
- Search & filter
- Dynamic pricing

### 📦 Order Features

- Place orders
- Payment verification
- Order status tracking
- View past orders
- Admin status updates

### 🧑‍💼 Admin Features

- Admin authentication
- Add / update / delete products
- View all orders
- Update order status
- Dashboard overview

---

## 🧠 Architecture Overview

```
Frontend/Admin → Axios → Backend API → MongoDB
                           ↓
                  Auth Middleware (JWT)
                           ↓
                    Controllers & Models
```

- **Single source of truth** for authentication (`req.userId`)
- Clean separation of **routes**, **controllers**, **models**
- Scalable REST API design

---

## 🗂️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=admin_password

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

STRIPE_SECRET_KEY=xxxx
RAZORPAY_KEY_ID=xxxx
RAZORPAY_KEY_SECRET=xxxx
```

---

## ▶️ Getting Started (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/wholesale-full-stack.git
cd wholesale-full-stack
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:4000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

### 4️⃣ Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

Admin runs on:

```
http://localhost:5174 (or next available port)
```

---

## 📡 API Endpoints (Sample)

### Auth

```
POST /api/user/register
POST /api/user/login
GET  /api/user/profile
```

### Products

```
GET    /api/product/list
POST   /api/product/add
DELETE /api/product/remove
```

### Orders

```
POST /api/order/place
POST /api/order/razorpay
POST /api/order/stripe
POST /api/order/userorders
```

---

## 🧪 Payments Supported

- ✅ Cash on Delivery
- ✅ Stripe (Card payments)
- ✅ Razorpay (India-focused gateway)

All payments are **verified server-side** before confirming orders.

---

## 📦 Deployment Ready

- Backend supports **Vercel / Render / Railway**
- Frontend & Admin ready for **Vercel / Netlify**
- Environment-based configuration
- Production-safe authentication flow

---

## 📈 Future Enhancements

- Wishlist
- Product reviews & ratings
- Invoice PDF generation
- Order cancellation & returns
- Email notifications
- Refresh token authentication
- Analytics dashboard

---

## 👨‍💻 Author

**Satinder Singh Sall**
Full-Stack Web Developer
📧 [satindersinghsall111@gmail.com](mailto:satindersinghsall111@gmail.com)

---

## ⭐ Final Notes

This project follows **real-world production patterns**:

- Secure JWT auth
- Clean MVC backend
- Modern React architecture
- Scalable payment handling
