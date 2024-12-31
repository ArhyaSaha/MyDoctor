import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
        },
        specialty: {
            type: String,
            required: false,
        },
        availableSlots: {
            type: [Date], // Array of Date objects
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = model("Doctor", doctorSchema);
export default Doctor;
