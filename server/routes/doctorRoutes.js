import express from "express";
import { allDoctors, addDoctor, getAvailableSlots, updateSlots } from "../controllers/doctorController.js";
// import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/all", allDoctors);
router.post("/add", addDoctor);
router.get("/:doctorId/slots", getAvailableSlots);
router.put("/:doctorId/slots", updateSlots);

export default router;
