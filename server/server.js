import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"
import patientRoutes from "./routes/patientRoutes.js";
import cors from "cors";
// const cors = require('cors');



dotenv.config();
connectDB();

const app = express();

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
//     credentials: true // Allow cookies and credentials if needed
// }));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/doctors", doctorRoutes); // Use the doctorRoutes for /api/doctors
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
