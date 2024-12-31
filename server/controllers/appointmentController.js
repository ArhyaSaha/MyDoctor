import Appointment from "../models/appointment.js";



export async function doctorAppointments(req, res) {
    try {
        const { doctorId } = req.params;
        const filter = doctorId ? { doctorId } : {};

        const appointments = await Appointment.find(filter).populate("patientId", "name email phone age gender");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
}

export async function patientAppointments(req, res) {
    try {
        const { patientId } = req.params;
        const filter = patientId ? { patientId } : {};
        const appointments = await Appointment.find(filter).populate("doctorId", "name specialty");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
}

export async function addAppointment(req, res) {
    try {
        const { doctorId, patientId, slot, status } = req.body;

        // Validate input
        if (!doctorId || !patientId || !slot?.date || !slot?.time) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            doctorId,
            patientId,
            slot,
            status: status || "Scheduled", // Default status if not provided
        });

        // Save to the database
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error("Error adding appointment:", error);
        res.status(500).json({ message: "Error adding appointment" });
    }
}
export async function updateAppointment(req, res) {
    try {
        const { appointmentId } = req.params; // The ID of the appointment to update
        const { slot, status } = req.body;

        // Find the appointment by ID and update the fields
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { slot, status },
            { new: true, runValidators: true } // Return the updated document and validate the fields
        );

        // If no appointment found, return an error
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Error updating appointment" });
    }
}

