# Frontend – Wholesale E-Commerce Platform

This is the **customer-facing frontend** of the Wholesale Full-Stack E-Commerce Platform.  
It provides a modern, responsive shopping experience with authentication, cart, checkout, orders, and profile management.

---

## 🚀 Tech Stack

### Core

- **React (Vite)** – Fast modern frontend framework
- **React Router DOM** – Client-side routing
- **Context API** – Global state management
- **Axios** – API communication

### Styling

- **Tailwind CSS** – Utility-first CSS framework
- **Custom UI Components** – Clean and responsive design

### Payments

- **Razorpay**
- **Stripe**

### Notifications

- **React Toastify** – User feedback & alerts

---

## ✨ Features

### 🛍️ Shopping Experience

- Product listing & collection filtering
- Product detail pages
- Related products
- Best seller section

### 🛒 Cart & Checkout

- Add/remove items from cart
- Quantity management
- Cart summary
- Place order (COD / Razorpay / Stripe)
- Full-screen & button loaders during checkout

### 👤 User Account

- User registration & login
- JWT-based authentication
- Profile page (fetched from backend)
- Order history
- Secure logout

### 📦 Orders

- View placed orders
- Order status tracking
- Payment method display
- Refresh order status

### 🔍 Extras

- Search functionality
- Responsive navbar (desktop & mobile)
- Fully responsive layout

---

## 📂 Folder Structure

```

frontend/
├── src/
│ ├── assets/ # Images & static assets
│ ├── components/ # Reusable UI components
│ ├── context/ # Global state (ShopContext)
│ ├── pages/ # App pages (Home, Cart, Orders, Profile, etc.)
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── package.json
└── vite.config.js

```

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend` root:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## ▶️ Run Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔗 Backend Dependency

This frontend requires the backend to be running:

```
http://localhost:4000
```

Ensure backend APIs are available before testing checkout, orders, and profile.

---

## 📌 Notes

- Uses JWT token stored in localStorage
- Secure routes handled via Context API
- All user data is fetched dynamically from backend
- Designed to scale for production deployment

---

## 👨‍💻 Author

**Satinder Singh Sall**
Full-Stack Developer

---

## 📜 License

This project is for educational and commercial use.
