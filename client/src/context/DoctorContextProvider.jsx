import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
    const [doctorId, setDoctorId] = useState('676d927acbce6886502ce9b9');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([])
    const [content, setContent] = useState(1);
    const [currentDoctorName, setCurrentDoctorName] = useState("Dr. Jane Smith");


    useEffect(() => {
        async function fetchSlots() {
            try {
                console.log("I was loaded bro")
                const response = await axios.get(`${API_BASE_URL}/api/doctors/${doctorId}/slots`);
                setAvailableSlots(response.data.availableSlots);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                // setError(error.message);
            }
        }

        fetchSlots();
    }, [doctorId]);
    useEffect(() => {
        console.log(availableSlots)
    }, [availableSlots])


    return (
        <DoctorContext.Provider value={{
            doctorId, setDoctorId,
            modalOpen, setModalOpen,
            selectedEvent, setSelectedEvent,
            availableSlots, setAvailableSlots,
            content, setContent,
            currentDoctorName, setCurrentDoctorName
        }}>
            {children}
        </DoctorContext.Provider>
    );
};
export default DoctorContextProvider;