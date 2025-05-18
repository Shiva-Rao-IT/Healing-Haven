const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;
/*Enter your secret key*/
const SECRET_KEY = "Your_Secret_key";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Your_EmailAddress",
    pass: "Your_AppPassword",
  },
});

app.use(cors());
app.use(express.json());
/*Enter your mongodb connection string*/
mongoose.connect("Your_ConnectionString", {});
const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));
db.on("error", (err) => console.error("❌ MongoDB error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const appointmentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  spouseName: String,
  childName: String,
  mobile: String,
  email: String,
  date: String,
  time: String,
  mainService: String,
  subService: String,
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already in use." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "Signup successful!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful!", token, username: user.username });
});

// Book Appointment + Schedule Email 1hr before
app.post("/api/appointments", authenticateToken, async (req, res) => {
  const {
    name,
    spouseName,
    childName,
    mobile,
    email,
    date,
    time,
    mainService,
    subService,
  } = req.body;

  try {
    const newAppointment = new Appointment({
      userId: req.user.id,
      name,
      spouseName,
      childName,
      mobile,
      email,
      date,
      time,
      mainService,
      subService,
    });

    await newAppointment.save();

    // Parse time like "2:40 PM - 4:40 PM"
    try {
      const [startTime] = time.split(" - ");
      const [startHourMinute, period] = startTime.trim().split(" ");
      const [rawHour, rawMinute] = startHourMinute.split(":").map(Number);

      let hour = rawHour;
      if (isNaN(hour) || isNaN(rawMinute)) {
        throw new Error("Invalid time format provided.");
      }

      if (period.toUpperCase() === "PM" && rawHour !== 12) hour += 12;
      if (period.toUpperCase() === "AM" && rawHour === 12) hour = 0;

      const minute = rawMinute;
      const [year, month, day] = date.split("-").map(Number);

      const appointmentDate = new Date(year, month - 1, day, hour, minute);
      appointmentDate.setHours(appointmentDate.getHours() - 1); // 1 hour before

      const notifyMinute = appointmentDate.getMinutes();
      const notifyHour = appointmentDate.getHours();
      const notifyDay = appointmentDate.getDate();
      const notifyMonth = appointmentDate.getMonth() + 1;

      if (
        [notifyMinute, notifyHour, notifyDay, notifyMonth].some((v) =>
          isNaN(v)
        )
      ) {
        throw new Error("Generated cron time has invalid values.");
      }

      const cronTime = `${notifyMinute} ${notifyHour} ${notifyDay} ${notifyMonth} *`;
      console.log("📅 Scheduled Email Cron:", cronTime);

      const roomId = newAppointment._id.toString();

      cron.schedule(cronTime, () => {
        const meetingLink = `https://meet.jit.si/${roomId}`;
        const chatLink = `http://localhost:3000/chat?room=${roomId}`;
/*Enter your test email*/
        const mailOptions = {
          from: "test_emailaddress",
          to: email,
          subject: "Upcoming Appointment Reminder",
          html: `
            <p>Hello ${name},</p>
            <p>You have an appointment scheduled at ${time} on ${date}.</p>
            <p><strong>Video Call:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
            <p><strong>Chat Room:</strong> <a href="${chatLink}">${chatLink}</a></p>
          `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error("Email error:", err);
          else console.log("📧 Email sent:", info.response);
        });
      });
    } catch (err) {
      console.error("⛔ Cron scheduling failed:", err.message);
    }

    res.status(201).json({
      message: "Appointment booked and email scheduled 1 hour before!",
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error while booking." });
  }
});

app.get("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const allAppointments = await Appointment.find({ userId: req.user.id });
    res.json(allAppointments);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching." });
  }
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
