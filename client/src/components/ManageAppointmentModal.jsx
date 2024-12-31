import React, { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContextProvider';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ManageAppointmentModal = () => {

    const { selectedEvent, setSelectedEvent, setModalOpen, availableSlots } = useContext(DoctorContext);

    const handleCancel = async () => {
        try {
            if (!selectedEvent) return;

            const appointmentId = selectedEvent.id; // Assuming the event ID matches the appointment ID
            const url = `${API_BASE_URL}/api/appointments/update/${appointmentId}`;
            const payload = {
                status: 'Cancelled',
            };

            const response = await axios.put(url, payload);

            console.log('Appointment updated:', response.data);

            // Optionally, you can update the event status locally to reflect changes in the calendar
            selectedEvent.setExtendedProp('status', 'Cancelled');

            setModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Error updating appointment:', error.response?.data || error.message);
        }

    };
    const formatSlot = (slot) => {
        const dateObj = new Date(slot);

        // Format the date as yyyy-mm-dd
        const date = dateObj.toISOString().split('T')[0];

        // Format the time as hh:mm AM/PM
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const time = new Intl.DateTimeFormat('en-US', timeOptions).format(dateObj);

        return { date, time };
    };

    const handleMissed = async () => {
        try {
            if (!selectedEvent) return;

            // Find the next available slot
            const nextAvailableSlot = availableSlots.find(
                (slot) => new Date(slot) > new Date(selectedEvent.start)
            );
            var payload = {
                status: 'Missed',
            };


            if (!nextAvailableSlot) {
                console.log("No available slots to reschedule.");
            } else {
                // Prepare the update payload
                const formattedSlot = formatSlot(nextAvailableSlot);
                console.log('Next Slot', formattedSlot)
                payload = {
                    status: "Missed",
                    slot: {
                        date: formattedSlot.date,
                        time: formattedSlot.time,
                    }, // Add newSlot for rescheduling
                };
            }


            const appointmentId = selectedEvent.id; // Assuming the event ID matches the appointment ID
            const url = `${API_BASE_URL}/api/appointments/update/${appointmentId}`;


            const response = await axios.put(url, payload);

            console.log('Appointment updated:', response.data);

            // Optionally, you can update the event status locally to reflect changes in the calendar
            selectedEvent.setExtendedProp('status', 'Missed');
            selectedEvent.setStart(nextAvailableSlot);

            setModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Error updating appointment:', error.response?.data || error.message);
        }

    };
    return (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Appointment Details</h2>
                <p><strong>Patient:</strong> {selectedEvent.title}</p>
                <p><strong>Time:</strong> {selectedEvent.start.toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedEvent.extendedProps.status}</p>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleMissed}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Mark as Missed
                    </button>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManageAppointmentModal