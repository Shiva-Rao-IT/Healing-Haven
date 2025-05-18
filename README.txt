# Healing Haven – Psychotherapy Consultancy Platform

Healing Haven is a full-stack web platform that offers mental health support through therapist booking, real-time chat, and self-assessment tools. The platform connects users with certified professionals while ensuring privacy, accessibility, and user-friendliness.

---

## 🧠 Features

- Therapist directory with specialization-based filters
- Appointment booking (online/offline)
- Secure login with role-based dashboards (User / Therapist / Admin)
- Real-time chat system using Socket.IO
- Self-assessment quizzes for disorders like OCD, ADHD, etc.
- Automated email reminders for scheduled appointments
- Encrypted storage of sensitive data and session information
- Responsive and clean UI using React and Material Design

---

## 🛠️ Technologies Used

- Frontend: React.js, HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Real-time: Socket.IO
- Email: Nodemailer + node-cron
- Authentication: JWT (JSON Web Tokens)
- Security: AES Encryption, SSL/TLS

---

## 🔐 Environment Variables (Required)

Before running the project, make sure to configure the following in your server.js or .env file:

- EMAIL_USER – Your email address used to send notifications
- EMAIL_PASS – App-specific password of your email
- JWT_SECRET – A strong secret key used for token encryption
- MONGO_URI – MongoDB connection string

⚠️ Important: Do not commit these credentials to your GitHub repository.

---

## 🚀 How to Run Locally

### Backend Setup

1. Clone the repository
   git clone https://github.com/your-username/healing-haven.git
   cd healing-haven/server

2. Install dependencies
   npm install

3. Create a .env file or set environment variables:
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_app_password
   JWT_SECRET=your_secret_key
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/db

4. Start the backend server
   node server.js

---

### Frontend Setup

1. Navigate to frontend folder
   cd ../client

2. Install dependencies
   npm install

3. Run the development server
   npm start

---

## 📸 Screenshots

(Add relevant screenshots: login page, dashboard, chat, assessment interface, etc.)

---

## ✅ Future Enhancements

- Video therapy integration using WebRTC
- Payment gateway for session fees
- AI-based therapist recommendation engine
- Multilingual support
- Mobile app (React Native)

---

## 🧑‍💻 Author

Shiva Yadav
MCA Student – GGSIPU
Project Mentor: Ms Sonia Batra

---

## 📄 License

This project is licensed under the MIT License.
