# 🎓 LearnSphere

<p align="center">
  <strong>A modern full-stack Learning Management System built with Next.js, Express, MongoDB, and TypeScript.</strong>
</p>

<p align="center">
  LearnSphere provides a complete learning platform where students can discover, purchase, and stream courses, interact with instructors through course discussions, and track their learning experience. Administrators get a powerful dashboard to manage users, courses, orders, platform content, analytics, and notifications.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-Educational-blue)

</p>

---

## 🚀 Live Demo

| Application   | URL                                |
| ------------- | ---------------------------------- |
| 🌐 Frontend   | https://learn-sphere-ui.vercel.app |
| ⚡ Backend API | https://learnsphere-api.vercel.app |

### 🔐 Demo Admin Account

Use the following account to explore the admin dashboard:

```text
Email: bc210419850rsh@vu.edu.pk
Password: admin123
```

> ⚠️ **Demo Environment Notice**
> This is a shared account intended for project reviewers and testers. Please do not change the password, delete existing data, or modify important demo content.

---

## 📸 Project Overview

LearnSphere is designed as a complete e-learning platform with separate experiences for students and administrators.

### 👨‍🎓 Student Features

* 🔎 Browse and explore available courses
* 🗂️ Filter courses by category
* 🔐 Secure authentication with email activation
* 🌐 Sign in using Google or GitHub
* 💳 Purchase courses using Stripe
* 🎥 Stream course videos
* 📚 Learn through structured course sections
* 💬 Ask questions on course lessons
* 🗨️ Reply to ongoing discussions
* ⭐ Rate and review purchased courses
* 👤 Update profile information and avatar
* 🔑 Change account password securely

### 🛠️ Admin Features

* 📊 Dashboard with platform analytics
* 👥 Manage users and assign roles
* 📚 Create, update, and delete courses
* 🎬 Manage course sections and video content
* ✨ Add course benefits and prerequisites
* 🧾 Manage orders and invoices
* 💳 Verify Stripe payments
* 📈 View user, course, and order analytics
* 🖼️ Manage hero banner and website content
* 🗂️ Manage course categories
* ❓ Manage FAQ content
* 🔔 Receive real-time notifications for:

  * New course orders
  * Student questions

---

# 🧰 Tech Stack

## Frontend

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| Next.js 13       | Frontend framework      |
| TypeScript       | Type safety             |
| Redux Toolkit    | State management        |
| RTK Query        | API data fetching       |
| Tailwind CSS     | Styling                 |
| Material UI      | UI components           |
| NextAuth         | Social authentication   |
| Formik           | Form handling           |
| Yup              | Form validation         |
| Stripe.js        | Payment integration     |
| Recharts         | Analytics charts        |
| Socket.IO Client | Real-time communication |

## Backend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| Node.js         | Runtime environment     |
| Express.js      | Backend framework       |
| TypeScript      | Type safety             |
| MongoDB         | Database                |
| Mongoose        | MongoDB ODM             |
| Redis / ioredis | Caching                 |
| JWT             | Authentication          |
| Cloudinary      | Image uploads           |
| Nodemailer      | Email delivery          |
| EJS             | Email templates         |
| Stripe          | Payment processing      |
| Socket.IO       | Real-time notifications |
| node-cron       | Scheduled tasks         |

---

# 🏗️ Project Architecture

```text
LearnSphere
│
├── client/                         # Next.js Frontend
│   │
│   ├── app/                        # App Router pages and components
│   ├── components/                 # Reusable UI components
│   ├── hooks/                      # Custom React hooks
│   ├── redux/
│   │   └── features/               # RTK Query API slices
│   │
│   ├── pages/
│   │   └── api/
│   │       └── auth/               # NextAuth configuration
│   │
│   ├── utils/                      # Helper functions
│   └── public/                     # Static assets
│
└── server/                         # Express Backend
    │
    ├── controllers/                # Request handlers
    ├── routes/                     # API routes
    ├── services/                   # Business logic
    ├── models/                     # MongoDB models
    ├── middleware/                 # Auth and error middleware
    ├── utils/                      # Database, JWT, Redis, mail helpers
    └── mails/                      # EJS email templates
```

---

# 🔄 Application Flow

```text
User
 │
 ▼
Next.js Client
 │
 │ HTTP Requests
 ▼
Express API
 │
 ├── Authentication
 ├── Course Management
 ├── Orders & Payments
 ├── Notifications
 └── Analytics
 │
 ▼
MongoDB Database
 │
 ├── Users
 ├── Courses
 ├── Orders
 └── Notifications

Additional Services
 │
 ├── Stripe
 ├── Cloudinary
 ├── Redis
 ├── Nodemailer
 └── Socket.IO
```

---

# ⚙️ Getting Started

## Prerequisites

Before running the project locally, make sure you have:

* Node.js **18 or later**
* npm
* MongoDB (Local or MongoDB Atlas)
* Stripe account
* Cloudinary account
* SMTP-compatible email account
* Redis *(optional for local development)*

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/codingwithriha/LearnSphere.git
```

## 2. Navigate to the Project

```bash
cd LearnSphere
```

## 3. Install Backend Dependencies

```bash
cd server
npm install
```

## 4. Install Frontend Dependencies

Open another terminal and run:

```bash
cd client
npm install
```

---

# ▶️ Running the Project

## Start the Backend

```bash
cd server
npm run dev
```

The API will run on:

```text
http://localhost:8000
```

## Start the Frontend

In a separate terminal:

```bash
cd client
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

## Backend Environment

Create a `.env` file inside the `server` directory.

```env
PORT=8000

DB_URI=mongodb://127.0.0.1:27017/lms-portal

ORIGIN=http://localhost:3000


# ================================
# JWT CONFIGURATION
# ================================

ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret

ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3


# ================================
# ACCOUNT ACTIVATION
# ================================

ACTIVATION_SECRET=your_activation_secret


# ================================
# CLOUDINARY
# ================================

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_SECRET_KEY=your_cloud_secret_key


# ================================
# EMAIL CONFIGURATION
# ================================

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail

SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password


# ================================
# STRIPE
# ================================

STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key


# ================================
# REDIS
# ================================

# REDIS_URL=redis://127.0.0.1:6379


NODE_ENV=development
```

---

## Frontend Environment

Create a `.env.local` file inside the `client` directory.

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000/api/v1/

NEXT_PUBLIC_SOCKET_SERVER_URI=http://localhost:8000/

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

SECRET=your_nextauth_secret
```

---

# 🌍 Using the Live Backend

If you want to run only the frontend locally while connecting to the deployed API:

```env
NEXT_PUBLIC_SERVER_URL=https://learnsphere-api.vercel.app/api/v1/

NEXT_PUBLIC_SOCKET_SERVER_URI=https://learnsphere-api.vercel.app/
```

---

# 📜 Available Scripts

## Server

| Command       | Description                       |
| ------------- | --------------------------------- |
| `npm run dev` | Start the backend with hot reload |

## Client

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Create a production build            |
| `npm run start` | Run the production build             |
| `npm run lint`  | Run ESLint                           |

---

# 🔌 API Overview

All API routes are prefixed with:

```text
/api/v1
```

Example:

```text
https://learnsphere-api.vercel.app/api/v1/get-courses
```

## 👤 Users

| Endpoint        | Description           |
| --------------- | --------------------- |
| `/registration` | Register a new user   |
| `/login`        | Authenticate a user   |
| `/me`           | Get current user      |
| `/social-auth`  | Social authentication |
| `/get-users`    | Get all users         |

---

## 📚 Courses

| Endpoint          | Description           |
| ----------------- | --------------------- |
| `/create-course`  | Create a new course   |
| `/get-courses`    | Retrieve all courses  |
| `/add-question`   | Add a course question |
| `/add-review/:id` | Add a course review   |

---

## 🛒 Orders

| Endpoint        | Description         |
| --------------- | ------------------- |
| `/create-order` | Create a new order  |
| `/get-orders`   | Retrieve all orders |

---

## 💳 Payments

| Endpoint                        | Description                     |
| ------------------------------- | ------------------------------- |
| `/payment`                      | Create Stripe payment intent    |
| `/payment/stripepublishablekey` | Retrieve Stripe publishable key |

---

## 🔔 Notifications

| Endpoint                    | Description                |
| --------------------------- | -------------------------- |
| `/get-all-notifications`    | Retrieve all notifications |
| `/update-notifications/:id` | Update notification status |

---

## 📊 Analytics

| Endpoint                 | Description                             |
| ------------------------ | --------------------------------------- |
| `/get-users-analytics`   | User analytics for the last 12 months   |
| `/get-courses-analytics` | Course analytics for the last 12 months |
| `/get-orders-analytics`  | Order analytics for the last 12 months  |

---

## 🎨 Layout

| Endpoint            | Description           |
| ------------------- | --------------------- |
| `/get-layout/:type` | Retrieve layout data  |
| `/edit-layout`      | Update website layout |

---

# 🔒 Authentication & Authorization

LearnSphere uses JWT-based authentication with:

* Access tokens
* Refresh tokens
* HTTP cookies
* Role-based authorization

Protected admin routes require:

```text
Authenticated User
        +
Admin Role
```

---

# 🔔 Real-Time Features

LearnSphere uses **Socket.IO** to provide real-time updates.

Administrators receive instant notifications when:

* 🛒 A new course is purchased
* 💬 A student asks a question

---

# 💾 Caching Strategy

The application supports Redis for improved performance.

If `REDIS_URL` is not configured during local development, the backend automatically falls back to an in-memory cache.

For production environments, it is recommended to use a managed Redis service.

---

# 🚀 Deployment

Both applications are deployed separately on Vercel.

### Frontend

Deployed as a standard Next.js application.

### Backend

The Express server is configured as a Vercel Serverless Function.

The `server/vercel.json` configuration routes incoming requests to:

```text
server.ts
```

---

## Production Deployment Checklist

Before deploying your own version:

* [ ] Configure all environment variables
* [ ] Update the backend `ORIGIN`
* [ ] Update `NEXT_PUBLIC_SERVER_URL`
* [ ] Update `NEXT_PUBLIC_SOCKET_SERVER_URI`
* [ ] Configure MongoDB Atlas
* [ ] Configure a production Redis instance
* [ ] Configure Cloudinary
* [ ] Configure Stripe production keys
* [ ] Configure production OAuth callback URLs
* [ ] Replace all development secrets

---

# 🔒 Security Notes

Never commit sensitive credentials to GitHub.

Make sure the following files are included in `.gitignore`:

```text
.env
.env.local
.env.production
```

For production deployments:

* Use strong JWT secrets
* Rotate compromised credentials immediately
* Use HTTPS
* Configure secure cookie settings
* Restrict CORS to trusted domains
* Use production Stripe keys only when ready

---

# 🧪 Recommended Improvements

Potential future improvements for LearnSphere:

* [ ] Course progress tracking
* [ ] Instructor profiles
* [ ] Advanced course search
* [ ] Wishlist functionality
* [ ] Coupon and discount system
* [ ] Student certificates
* [ ] Course completion tracking
* [ ] Video watch history
* [ ] Email notification preferences
* [ ] Advanced analytics
* [ ] Multi-language support
* [ ] Dark mode improvements
* [ ] Automated testing
* [ ] CI/CD pipeline

---

# 👩‍💻 Author

**Riha Shahzadi**

Full Stack Developer focused on building modern, scalable, and user-friendly web applications.

GitHub: https://github.com/codingwithriha

---


<p align="center">

⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using Next.js, Node.js, Express, MongoDB, and TypeScript.

</p>
