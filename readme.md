# RBAC Blog App – Backend (Node.js + Express + MongoDB)

This is the backend for the **RBAC Blog App**, built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It supports user registration, login, role-based access control, and CRUD for blog posts.

---

## 📦 Features

- JWT-based authentication
- Role-based access (`user`, `admin`)
- MongoDB with Mongoose ODM
- Secure password hashing with **bcryptjs**
- Middleware for auth & role checks
- RESTful API structure

---

## 🚀 Getting Started

### 1. Git pull Repo

- git pull https://github.com/SwetaPrasaddd/RBAC-Backend.git

### 1. Install dependencies

- npm install

### 3. Run the Backend

- npm run dev

# Note: For security purpose, I haven't added the email and password in .env file

### To enable email verification in your Node.js application, configure the following in your .env file.

## ✅ Gmail (Using App Password)
# Enable 2-Step Verification:

 - Visit: https://myaccount.google.com/security
 - Generate App Password:
 - Click on App passwords
 - Choose Mail and name the app (e.g., BlogPlatform)
 - Copy the generated 16-digit password
 - Add to .env file:

* EMAIL_USER=yourgmail@gmail.com
* EMAIL_PASS=your_16_digit_app_password