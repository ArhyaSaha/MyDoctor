import mongoose from "mongoose";

const { Schema, model } = mongoose;

const patientSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const Patient = model("Patient", patientSchema);

export default Patient;