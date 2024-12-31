import express from "express"
import Patient from "../models/patient.js";


export async function addPatient(req, res) {
    try {
        const { name, phone, email, age, gender } = req.body;

        // Validate input
        if (!name || !phone || !email || !age || !gender) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new patient
        const newPatient = new Patient({ name, phone, email, age, gender });
        const savedPatient = await newPatient.save();

        res.status(201).json(savedPatient);
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ message: "Error adding patient" });
    }

}
// Function to get all patients
export async function getAllPatients(req, res) {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Error fetching patients" });
    }
}