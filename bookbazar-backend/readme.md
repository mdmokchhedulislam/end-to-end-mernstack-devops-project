# Book Shop Application 📚

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform for buying books with role-based authentication and payment integration.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Available-green)](https://bookbazzar-online-ph-a4.vercel.app)

Live :

```
https://bookbazzar-online-ph-a4.vercel.app
```

## Features ✨

### Core Functionalities

- **🔐 Role-Based Authentication**

  - User registration/login with JWT
  - Admin dashboard for product/order management
  - Protected routes for checkout/dashboard

- **📖 Book Management**

  - Browse books with filters (price, category)
  - Search by title/author/category
  - Detailed product view with "Buy Now" option

- **💰 Order System**
  - Stock validation during checkout
  - SSlcommerz payment gateway integration
  - Order history tracking



## Tech Stack 💻

# E-commerce Project Setup Guide

![Project Stack](https://img.shields.io/badge/Full_Stack-Project-blueviolet)

## Technology Stack 🔧

**Frontend**  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blueviolet)
![React](https://img.shields.io/badge/React-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-red)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Ant Design](https://img.shields.io/badge/Ant_Design-%230072f6)

**Backend**  
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Node.js](https://img.shields.io/badge/Node.js-green)
![Express](https://img.shields.io/badge/Express-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-green)
![JWT](https://img.shields.io/badge/JWT-blue)

**Payment Gateway**  
![SSLCommerz](https://img.shields.io/badge/Payment_SSLCommerz-API-orange)

## Development Setup 🛠️

### Frontend Setup

## Installation 🛠️

1. Clone repository

```
Clone Repository : https://github.com/HumayunKabirSobuj/b4a4-BookBazaar-server.git
```

2. cd b4a4-BookBazaar-server

```
npm install
```

3. Create .env file

```
VITE_API_LINk : <provide your api link here>
NODE_ENV=development
PORT=8080
DATABASE_URL=<provide your mongoDB api link here>
BCRYPT_SALT_ROUNDS=<provide your BCRYPT_SALT_ROUNDS link here>
JWT_ACCESS_SECRET=<provide your JWT_ACCESS_SECRET link here>
JWT_REFRESH_SECRET=<provide your JWT_REFRESH_SECRET link here>
JWT_ACCESS_EXPIRES_IN=<provide your JWT_ACCESS_EXPIRES_IN link here>
JWT_REFRESH_EXPIRES_IN=<provide your JWT_REFRESH_EXPIRES_IN link here>

STORE_ID=<provide your Store_id link here>
STORE_PASS=<provide your Store_password link here>
```

4. Run Project

```
npm run start:dev
```

Developed with ❤️ by [Md. Humayun Kabir Sobuj]

 Contact: devhumayun@gmail.com

