import Doctor from "../models/doctor.js";

// Add a new doctor
export const addDoctor = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, specialty, availableSlots } = req.body;

        // Check if availableSlots exists and is an array
        if (!Array.isArray(availableSlots)) {
            return res.status(400).json({
                message: "Invalid input: 'availableSlots' must be an array of date strings",
            });
        }

        // Parse availableSlots into Date objects
        const parsedSlots = availableSlots.map((slot) => new Date(slot));

        const doctor = new Doctor({
            name,
            email,
            phone,
            specialty,
            availableSlots: parsedSlots,
        });

        await doctor.save();
        res.status(201).json({
            message: "Doctor added successfully",
            doctor,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding doctor",
            error: error.message,
        });
    }
};
export async function allDoctors(req, res) {
    try {
        const { specialty, startDate, endDate, startTime, endTime } = req.query;
        const filter = {};

        if (specialty) {
            filter.specialty = specialty;
        }

        if (startDate && endDate) {
            const startOfDay = new Date(`${startDate}T00:00:00.000Z`);
            const endOfDay = new Date(`${endDate}T23:59:59.999Z`);

            if (startTime && endTime) {
                const startDateTime = new Date(`${startDate}T${startTime}.000Z`);
                const endDateTime = new Date(`${endDate}T${endTime}.000Z`);
                filter.availableSlots = {
                    $elemMatch: {
                        $gte: startDateTime,
                        $lte: endDateTime
                    }
                };
            } else {
                filter.availableSlots = {
                    $gte: startOfDay,
                    $lte: endOfDay
                };
            }
        }

        console.log('Filter criteria:', filter);

        const doctors = await Doctor.find(filter);

        console.log('Doctors found:', doctors.length);

        // Post-process to only include matching slots if date filters are provided
        const filteredDoctors = doctors.map((doctor) => {
            const { availableSlots, ...doctorData } = doctor.toObject();

            console.log('Doctor:', doctorData);
            console.log('Available Slots:', availableSlots);

            let matchingSlots;
            if (startDate && endDate) {
                if (startTime && endTime) {
                    const startDateTime = new Date(`${startDate}T${startTime}.000Z`);
                    const endDateTime = new Date(`${endDate}T${endTime}.000Z`);
                    console.log('Start DateTime:', startDateTime);
                    console.log('End DateTime:', endDateTime);
                    matchingSlots = availableSlots.filter(
                        (slot) => new Date(slot) >= startDateTime && new Date(slot) <= endDateTime
                    );
                } else {
                    const startOfDay = new Date(`${startDate}T00:00:00.000Z`);
                    const endOfDay = new Date(`${endDate}T23:59:59.999Z`);
                    console.log('Start of Day:', startOfDay);
                    console.log('End of Day:', endOfDay);
                    matchingSlots = availableSlots.filter(
                        (slot) => new Date(slot) >= startOfDay && new Date(slot) <= endOfDay
                    );
                }
                console.log('Matching Slots:', matchingSlots);
                return {
                    ...doctorData,
                    availableSlots: matchingSlots,
                };
            } else {
                return {
                    ...doctorData,
                    availableSlots,
                };
            }
        });

        res.status(200).json(filteredDoctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error: error.message });
    }
}


// Get available slots for a doctor
export async function getAvailableSlots(req, res) {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        doctor.availableSlots.sort((a, b) => new Date(a) - new Date(b));
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ availableSlots: doctor.availableSlots });
    } catch (error) {
        res.status(500).json({ message: "Error fetching slots", error: error.message });
    }
}

// Update slots for a doctor

export const updateSlots = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { availableSlots } = req.body;

        // Parse the incoming slots to Date objects
        const parsedSlots = availableSlots.map((slot) => new Date(slot));
        console.log(parsedSlots)

        // Update the availableSlots field
        console.log('D ID:', doctorId)
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId, // Find the doctor by ID
            { availableSlots: parsedSlots }, // Update the availableSlots field
            { new: true } // Return the updated document
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({
            message: "Slots updated successfully",
            doctor,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating slots",
            error: error.message,
        });
    }
};