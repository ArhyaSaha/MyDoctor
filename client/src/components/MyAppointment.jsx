import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import Card from '../components/Card'
import { PatientContext } from '../context/PatientContextProvider';


const MyAppointment = () => {

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null)
    const { patientId } = useContext(PatientContext);

    useEffect(() => {
        async function fetchAppointments() {
            try {
                console.log("Fetching appointments for patientId:", patientId);
                const response = await axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`);
                console.log("API Response:", response.data);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError(error.message);
            }
        }

        fetchAppointments();
    }, [patientId]);

    return (
        <div className='m-5 flex flex-col w-full'>
            <p className='font-semibold text-lg'>Your Appointments</p>
            <div className='w-full flex flex-row gap-4 flex-wrap'>
                {appointments.length === 0 ? (
                    <div className='w-full h-64 text-center '>
                        <p >No Appointments Currently</p>
                    </div>
                ) : (
                    appointments.map((appointment) => (
                        <Card
                            key={appointment._id}
                            appointmentId={appointment._id}
                            specialization={appointment.doctorId.specialty}
                            name={appointment.doctorId.name}
                            date={appointment.slot.date}
                            time={appointment.slot.time}
                            status={appointment.status}
                        />
                    ))
                )}

            </div>
        </div>
    )
}

export default MyAppointment