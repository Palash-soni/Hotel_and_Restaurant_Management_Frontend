# 🏨 Hotel & Restaurant Management System — Frontend Client

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive, and full-featured web client for managing luxury hotels and dine-in restaurants. Built with **React 19**, **Vite**, **Tailwind CSS**, and **Razorpay** payment gateway integration.

---

## 🌟 Key Features

### 👤 Role-Based Portals & Dashboards

1. **Guest / Customer Experience**:
   - **Room Booking**: Real-time room availability search with calendar date validation (preventing past check-in dates and enforcing check-out after check-in).
   - **Restaurant Table Reservation**: Live table booking with time slot and party size selection.
   - **Restaurant Menu**: Interactive digital food menu categorized by meals, drinks, and specials.
   - **My Bookings**: Customer booking dashboard with receipt downloads.
   - **Reviews & Feedback**: Submit and browse genuine guest reviews.

2. **👑 Admin Dashboard**:
   - **Live Analytics**: Overview of bookings, occupied rooms, active tables, and revenue.
   - **Staff Management**: View, add, search, and toggle active/inactive status for waiters, receptionists, and administrators.
   - **Room & Table Control**: Add/edit hotel rooms and restaurant tables.
   - **Menu Editor**: Add food items, set prices, categories, and availability.
   - **Booking Records**: Comprehensive log of room and dining reservations with status filters.

3. **🛎️ Receptionist Portal**:
   - Quick check-in for walk-in and online guests.
   - View current room occupants and upcoming arrivals.
   - View table dining sessions and assign available waiters.
   - Historical check-out and booking archive.

4. **🍽️ Waiter Portal**:
   - Table-specific ordering interface.
   - Quick-add food items and review live kitchen tickets.
   - Track active table bills and payment clearance.

5. **💳 Seamless Online Payments**:
   - Integrated **Razorpay Checkout** with cryptographic signature verification.
   - Auto-generated printable receipts upon booking completion.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/) (with JWT bearer auth interceptor)
- **Payment Gateway**: [Razorpay](https://razorpay.com/)

---

## 📁 Project Structure

```text
Frontend/
├── public/                  # Static assets and favicon
├── src/
│   ├── api/                 # Centralized Axios client & API endpoints
│   │   ├── apiClient.js     # Axios client with JWT auto-injection
│   │   └── dashboardApi.js  # Dashboard metrics
│   ├── assets/              # Images, icons, and logos
│   ├── components/          # Reusable UI & modular components
│   │   ├── Customer/        # Customer-specific booking views
│   │   ├── receptionist/    # Reception forms, tables & cards
│   │   ├── waiter/          # Waiter order-taking & table selection
│   │   ├── menuAdmin/       # Menu management cards & forms
│   │   ├── rooms/           # Room listing & creation components
│   │   ├── tables/          # Table management components
│   │   └── reviews/         # Reviews rendering components
│   ├── layout/              # Admin, Receptionist, Waiter & Main Layouts
│   ├── App.jsx              # Application router & protected routes
│   ├── main.jsx             # React DOM root
│   └── index.css            # Tailwind & global stylesheet
├── .env.example             # Template for frontend environment variables
├── .gitignore               # Excludes secrets, dist, and node_modules
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm**
- Backend server running on `http://localhost:3000` (or your deployed URL)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Palash-soni/Hotel_and_Restaurant_Management_Frontend.git
cd Hotel_and_Restaurant_Management_Frontend
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your values:
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Backend API base URL
VITE_API_BASE_URL=http://localhost:3000

# Razorpay Test / Production Key
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
Production build assets will be generated in the `dist/` directory.

---

## 🔐 Security & Best Practices
- Sensitive `.env` files are ignored by `.gitignore` to prevent credential leaks.
- Client token storage uses standard JWT authentication with protected role guards (`AdminRoute`, `ReceptionistRoute`, `WaiterRoute`, `CustomerRoute`).
- Automatic client-side validation prevents invalid bookings (past dates, invalid checkout ranges, empty fields).

---

## 📄 License
This project is licensed under the MIT License.
