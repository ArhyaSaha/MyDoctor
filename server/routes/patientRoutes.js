import express from "express"
import { addPatient, getAllPatients } from "../controllers/patientController.js";


const router = express.Router();
router.post("/add", addPatient);
router.get("/all", getAllPatients);

export default router;