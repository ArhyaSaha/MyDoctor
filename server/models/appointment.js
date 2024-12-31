import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    slot: {
        date: { type: String, required: true },
        time: { type: String, required: true },
    },
    status: { type: String, enum: ["Scheduled", "Missed", "Cancelled"], default: "Scheduled" },
});
const Appointment = model("Appointment", appointmentSchema);
export default Appointment
