# Admin Panel – Wholesale E-Commerce Platform

This is the **Admin Dashboard** for the Wholesale Full-Stack E-Commerce Platform.  
It allows administrators to manage products, orders, and overall store operations through a modern and secure interface.

---

## 🚀 Tech Stack

### Core

- **React (Vite)** – Fast admin interface
- **React Router DOM** – Admin routing
- **Axios** – API communication
- **JWT Authentication** – Secure admin access

### UI & Styling

- **Tailwind CSS** – Utility-first styling
- **Custom UI Components (shadcn-inspired)**
  - Buttons
  - Tables
  - Dialogs & Alerts
  - Forms & Inputs
  - Cards & Badges

### Notifications

- **React Toastify** – Success & error alerts

---

## ✨ Admin Features

### 🔐 Authentication

- Secure admin login
- Token-based authentication
- Protected admin routes

### 📦 Product Management

- Add new products (multiple images)
- Edit product details
- View product list
- Delete products
- Bestseller tagging

### 📋 Order Management

- View all customer orders
- Order detail modal
- Update order status (Placed, Packing, Shipped, Delivered)
- Payment status visibility

### 📊 Dashboard

- Overview of products & orders
- Clean, responsive admin layout
- Sidebar navigation

### ⚡ UX Enhancements

- Button loaders
- Full-screen loaders
- Confirmation dialogs
- Responsive design for all screen sizes

---

## 📂 Folder Structure

```

admin/
├── src/
│ ├── assets/ # Admin icons & images
│ ├── components/ # Reusable components & UI
│ │ └── ui/ # Button, Table, Dialog, etc.
│ ├── pages/ # Admin pages (Add, List, Orders, Dashboard)
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── package.json
└── vite.config.js

```

---

## ⚙️ Environment Variables

Create a `.env` file in the `admin` root:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## ▶️ Run Admin Panel Locally

```bash
cd admin
npm install
npm run dev
```

Admin panel will run at:

```
http://localhost:5174
```

_(Port may vary depending on availability)_

---

## 🔗 Backend Dependency

The admin panel depends on backend APIs:

- `/api/user/admin` – Admin login
- `/api/product/*` – Product management
- `/api/order/*` – Order management

Make sure the backend server is running before using the admin panel.

---

## 🔒 Security Notes

- Admin authentication uses a separate admin route
- Admin credentials are stored securely via environment variables
- All sensitive routes are protected via middleware

---

## 👨‍💻 Author

**Satinder Singh Sall**
Full-Stack Developer

---

## 📜 License

This project is intended for educational and commercial use.
