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
   ```bash
   git clone https://github.com/your-username/healing-haven.git
   cd healing-haven/server
   ```

3. Install dependencies
   ```bash
   npm install
   ```

5. Create a .env file or set environment variables:
   ```bash
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_app_password
   JWT_SECRET=your_secret_key
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/db
   ```

7. Start the backend server
   ```bash
   node server.js
   ```

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
![image](https://github.com/user-attachments/assets/b8107e61-9732-4c5d-aa7c-50bbb13030e0)
![image](https://github.com/user-attachments/assets/ca274dc9-bc71-4c51-bd10-6bc389e0156e)
![image](https://github.com/user-attachments/assets/a9cb8068-22c8-4452-bd43-994fd5e6ce94)
![image](https://github.com/user-attachments/assets/66689f4d-9391-4199-99d9-a192a859aab7)
![image](https://github.com/user-attachments/assets/c837a987-5b5e-4c72-a1b1-420ed689318c)
![image](https://github.com/user-attachments/assets/74aa55b2-edb8-446f-9609-6c8299a68337)







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
