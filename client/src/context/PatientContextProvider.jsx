import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';


export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [sidebarVal, setSidebarVal] = useState(1)
    const [patientId, setPatientId] = useState('677124bc8564cd384310758c');
    const [patients, setPatients] = useState([]);
    const [currentPatientName, setCurrentPatientName] = useState("Arjun Patel");
    const [patientDetails, setPatientDetails] = useState({ _id: "677124bc8564cd384310758c", name: "Arjun Patel", phone: "7654321980", email: "arjun.patel@example.com", age: 40, gender: "Male" });



    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors/all', {
                    params: {
                        specialty: specialty || undefined, // Only include specialty if it's not an empty string
                        startDate: startDate || undefined,
                        endDate: endDate || undefined,
                        startTime: startTime || undefined,
                        endTime: endTime || undefined
                    }
                });
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                // setError(error.message);
            }
        }

        fetchDoctors();
    }, [specialty, startDate, endDate, startTime, endTime]);


    return (
        <PatientContext.Provider value={{
            doctors, setDoctors,
            specialty, setSpecialty,
            startDate, setStartDate,
            endDate, setEndDate,
            startTime, setStartTime,
            endTime, setEndTime,
            patientId, setPatientId,
            sidebarVal, setSidebarVal,
            patients, setPatients,
            currentPatientName, setCurrentPatientName,
            patientDetails, setPatientDetails
        }}>
            {children}
        </PatientContext.Provider>
    );
};
export default PatientContextProvider;