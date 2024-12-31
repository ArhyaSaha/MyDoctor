import React, { useState, useContext } from 'react';
import { PatientContext } from '../context/PatientContextProvider';



const BookingModal = ({ doctorId, name, specialty, availableSlots, onClose }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const { patientId } = useContext(PatientContext);

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBooking = async () => {
        if (!selectedSlot) {
            alert('Please select a slot!');
            return;
        }

        // Format the selected slot into date and time
        const slotDate = new Date(selectedSlot).toISOString().split('T')[0];
        const slotTime = new Date(selectedSlot).toTimeString().split(':').slice(0, 2).join(':');
        let [hours, minutes] = slotTime.split(':');
        hours = parseInt(hours, 10);

        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert '0' to '12' for midnight

        const timet = `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
        console.log('time', timet)

        const requestBody = {
            doctorId,
            patientId, // Pass this value dynamically based on the current patient
            slot: {
                date: slotDate,
                time: timet,
            },
            status: "Scheduled",
        };

        setLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${API_BASE_URL}/api/appointments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            alert('Appointment booked successfully!');
            onClose();
        } catch (error) {
            alert(`Failed to book appointment: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-slate-200 text-black rounded-lg p-6 w-[90%] max-w-md'>
                <h2 className='text-xl font-bold mb-4'>{`Book Appointment with ${name}`}</h2>
                <p className='text-md font-medium mb-2'>{`Specialty: ${specialty}`}</p>

                <div className='mb-4'>
                    <h3 className='text-lg font-semibold'>Available Slots:</h3>
                    {availableSlots.length > 0 ? (
                        <div className='mt-3 h-32 rounded-3xl scroll-m-1 bg-slate-300 p-5 overflow-y-auto'>
                            {availableSlots.map((slot, index) => (
                                <div key={index} className='flex items-center mb-2'>
                                    <input
                                        type='radio'
                                        id={`slot-${index}`}
                                        name='slot'
                                        value={slot}
                                        onChange={() => handleSlotSelect(slot)}
                                    />
                                    <label htmlFor={`slot-${index}`} className='ml-2'>
                                        {new Date(slot).toLocaleString()}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No slots available.</p>
                    )}
                </div>

                <div className='flex justify-end'>
                    <button
                        className='bg-gray-400 text-white px-4 py-2 rounded-md mr-2'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md'
                        onClick={handleBooking}
                    >
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
