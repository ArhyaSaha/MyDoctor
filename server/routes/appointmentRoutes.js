import express from "express";
import { doctorAppointments, addAppointment, updateAppointment, patientAppointments } from "../controllers/appointmentController.js";

const router = express.Router();
router.get("/doctor/:doctorId", doctorAppointments);
router.get("/patient/:patientId", patientAppointments)
router.post("/add", addAppointment);
router.put("/update/:appointmentId", updateAppointment);

export default router;