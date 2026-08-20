# SkillNest

SkillNest is a full-stack Learning Management System built with the MERN stack. It allows students to browse, purchase, and learn from online courses while providing an admin interface for managing courses and lessons.

## Features

### Student

* User registration and login
* Email OTP verification
* Forgot and reset password
* Google authentication
* Browse and search courses
* Filter courses by category, difficulty, price type, and price range
* Sort courses by newest, oldest, and price
* View course details and syllabus
* Add courses to cart
* Wishlist
* Purchase courses
* Course enrollment
* Course player
* Track completed lessons
* Track learning progress
* Continue learning from the last watched lesson

### Admin

* Admin dashboard
* Create and manage courses
* Add and manage lessons
* Manage course syllabus
* Manage instructors
* Update course information

### Authentication

* JWT authentication
* Access and refresh tokens
* HTTP-only cookies
* Password hashing with bcrypt
* OTP-based email verification
* Protected routes
* Role-based access control

### Payments

* Razorpay integration
* Course payment flow
* Automatic enrollment after successful payment

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Material UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Passport.js
* Cookie Parser
* CORS

### Services

* MongoDB Atlas
* Cloudinary
* Resend
* Razorpay

## Project Structure

SkillNest
├── frontend
│   ├── components
│   ├── pages
│   ├── store
│   └── services
│
└── backend
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── services
    └── utils


