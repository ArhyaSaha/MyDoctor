import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PatientContext } from "../context/PatientContextProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChangePatient = () => {
    const { patientId, setPatientId, patients, setPatients, currentPatientName, setCurrentPatientName, patientDetails, setPatientDetails } = useContext(PatientContext)


    // Fetch all patients on component mount
    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/patients/all`);
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }
        fetchPatients();
    }, []);

    // Handle patient selection
    const handlePatientChange = (patientId) => {
        const selectedPatient = patients.find((patient) => patient._id === patientId);

        if (selectedPatient) {
            setPatientId(patientId);
            setCurrentPatientName(selectedPatient.name);
            setPatientDetails(selectedPatient);
        }
        console.log(selectedPatient)
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Change Patient</h1>

            <label htmlFor="patientSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select a Patient:
            </label>

            <select
                id="patientSelect"
                className="border p-2 rounded w-full mb-4"
                onChange={(e) => handlePatientChange(e.target.value)}
            >
                <option value="">-- Select a Patient --</option>
                {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                        {patient.name}
                    </option>
                ))}
            </select>

            {patientId && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Selected Patient Details</h2>
                    <p>
                        <strong>Name:</strong> {currentPatientName}
                    </p>
                    <p>
                        <strong>Phone:</strong> {patientDetails.phone}
                    </p>
                    <p>
                        <strong>Email:</strong> {patientDetails.email}
                    </p>
                    <p>
                        <strong>Age:</strong> {patientDetails.age}
                    </p>
                    <p>
                        <strong>Gender:</strong> {patientDetails.gender}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChangePatient;
