# 💸 Backend Ledger

A backend system for managing **user transactions with email notifications**.
Built to simulate real-world financial workflows like authentication, transactions, and alerts.

---

## 🚀 Features

* 🔐 User Authentication (Register/Login)
* 💸 Create & Manage Transactions
* 📧 Email Notifications (on actions)
* ⏱️ Transaction Timestamp Tracking
* 🔄 Session Handling
* 🛡️ Secure API with JWT

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer

---

## 📂 Structure

```bash
config/
models/
routes/
controllers/
middleware/
```

---

## ⚡ Setup

```bash
git clone https://github.com/rajvircodes/backend-ledger.git
cd backend-ledger
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_db
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Run:

```bash
npm run dev
```

---

## 📬 API (Core)

* `POST /auth/register`
* `POST /auth/login`
* `POST /transactions` → create transaction + send email
* `GET /transactions` → fetch user transactions

---

## 🧠 What I Built

* Transaction system
* Email-triggered workflows
* Secure session-based backend
* Real-world backend architecture

---

## 🎓 Acknowledgement

This project was built with guidance from **Ankur Prajapati** at **Sheryians Coding School**.


---

## 👨‍💻 Author

Rajvirsinh

---

⭐ Star this repo if you like it!
