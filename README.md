# Course Data Retreival 

This repository contains an authentication system built using **Node.js**, **Express**, and **MongoDB**. It supports user sign-up, email verification using OTP, sign-in, forgot password, and password reset functionalities and allows users to access the course data 

---

## Features

* User registration with hashed passwords.
* Email verification using One-Time Password (OTP) sent via **Nodemailer**.
* Secure login with JWT authentication.
* Password recovery with OTP verification.
* Responsive front-end forms using **Bootstrap**.

---

## Technologies Used

### Backend:

* **Node.js**
* **Express**
* **MongoDB** with Mongoose
* **Nodemailer** for sending emails
* **bcrypt.js** for hashing passwords
* **jsonwebtoken** for authentication
* **body-parser** for handling request bodies

### Frontend:

* **HTML**
* **CSS**
* **JavaScript** (Fetch API)
* **Bootstrap** for styling

---

## Project Structure

📁 Root Directory
├── 📁 data
│   ├── index1.html
│   ├── index2.html
│   ├── styles.css
│   ├── style1.css
├── 📁 public
│   ├── forgot-password.html
│   ├── reset-password-otp.html
│   ├── script.js
│   ├── style.css
├── server.js
├── README.md
├── package.json
├── package-lock.json

---

## Installation and Setup

1. ### Clone the Repository :
 - git clone **repository-url**
 - cd **repository-name**

2. **Install Dependencies**:
- npm install

3. ### Set Up Environment Variables: Create a .env file in the root directory with the following variables :
     - MONGO_URI="Your MongoDB Connection String"
     - JWT_SECRET="Your Secret Key for JWT"
     - EMAIL_USER="Your Email Address"
     - EMAIL_PASS="Your Email Password"

4. ### Run the Application :
* node server.js
* Access the Application: Open your browser and go to http://your-ip:2000.
# API Endpoints

 ### Authentication
 ## Sign-Up
* POST /signup
* Request Body :
{
  "name": "user-name", 
  "email": "user-email", 
  "password": "user-password"
}

## Verify OTP

* POST /verify-otp
* Request Body:
{
  "userId": "user-id", 
  "otp": "otp"
}

## Sign-In

* POST /signin
* Request Body:
{
  "email": "user-email", 
  "password": "user-password"
}

# Password Management

## Forgot Password

* POST /forgot-password
* Request Body:
{
  "email": "user-email"
}

## Reset Password

* POST /reset-password
* Request Body:
{
  "email": "user-email"
  "otp": "otp", 
  "newPassword": "new-password"
}

## Frontend Directory Structure

* data Directory
* index1.html: Main dashboard for logged-in users.
* index2.html: Alternative dashboard.
* styles.css: CSS for index1.html.
* style1.css: CSS for index2.html.

## public Directory

* forgot-password.html: Page for users to initiate password recovery.
* reset-password-otp.html: Page for users to enter OTP and reset their password.
* script.js: JavaScript for handling form submissions and API requests.
* style.css: Shared styling for public pages.

## Notes

* Security: Ensure you update EMAIL_PASS with an app password (not your email password) if you're using Gmail.
* Dependencies: Check package.json for all dependencies.
* Testing: Test the application thoroughly before deploying to production.
