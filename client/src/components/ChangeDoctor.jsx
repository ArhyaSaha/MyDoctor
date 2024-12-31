import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContextProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ChangeDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    const { availableSlots, setAvailableSlots, doctorId, setDoctorId, currentDoctorName, setCurrentDoctorName } = useContext(DoctorContext)
    // Fetch all doctors on component mount
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/doctors/all`);
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        }
        fetchDoctors();
    }, []);

    // Handle doctor selection
    const handleDoctorChange = (doctorId) => {
        const selectedDoctor = doctors.find((doc) => doc._id === doctorId);

        if (selectedDoctor) {
            setDoctorId(doctorId);
            setCurrentDoctorName(selectedDoctor.name);
            setAvailableSlots(selectedDoctor.availableSlots);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Change Doctor</h1>

            <label htmlFor="doctorSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select a Doctor:
            </label>

            <select
                id="doctorSelect"
                className="border p-2 rounded w-full mb-4"
                onChange={(e) => handleDoctorChange(e.target.value)}
            >
                <option value="">-- Select a Doctor --</option>
                {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                    </option>
                ))}
            </select>

            {doctorId && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Selected Doctor Details</h2>
                    <p>
                        <strong>Name:</strong> {currentDoctorName}
                    </p>
                    <p>
                        <strong>Available Slots:</strong> {availableSlots.length}
                    </p>
                    <ul className="list-disc list-inside">
                        {availableSlots.map((slot, index) => (
                            <li key={index}>{new Date(slot).toLocaleString()}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ChangeDoctor;
