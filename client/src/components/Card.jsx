import React from 'react';
import { MdCallMissed } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { useState } from "react";
const Card = ({ appointmentId, specialization, name, date, time, status }) => {
    const [availableSlots, setAvailableSlots] = useState([])
    const [currStatus, setCurrStatus] = useState(status)
    const [currTime, setCurrTime] = useState(time)
    function divColor() {
        if (currStatus === 'Missed') {
            return 'bg-yellow-600';
        } else if (currStatus === 'Completed') {
            return 'bg-green-300';
        } else if (currStatus === 'Cancelled') {
            return 'bg-red-400';
        } else if (currStatus === 'Scheduled') {
            return 'bg-blue-400';
        } else {
            return 'bg-gray-300'; // Default color
        }
    }

    // Handle Miss Appointment button click
    const handleMissAppointment = async () => {
        try {
            const url = `http://localhost:5000/api/appointments/update/${appointmentId}`;
            const payload = {
                status: 'Missed',
            };

            const response = await axios.put(url, payload);

            console.log('Appointment updated:', response.data);
            setCurrStatus('Missed');
        } catch (error) {
            console.error('Error updating appointment:', error.response?.data || error.message);
        }

    };

    // Handle Cancel Appointment button click
    const handleCancelAppointment = async () => {
        try {
            const url = `http://localhost:5000/api/appointments/update/${appointmentId}`;
            const payload = {
                status: 'Cancelled',
            };

            const response = await axios.put(url, payload);

            console.log('Appointment updated:', response.data);
            setCurrStatus('Cancelled');
        } catch (error) {
            console.error('Error updating appointment:', error.response?.data || error.message);
        }
    };

    return (
        <div className={`mr-4 mt-3  w-64 rounded-lg h-64 pl-4 pt-3 ${divColor()}`}>
            <div className='flex justify-between items-center'>

                <p className='text-white text-lg  items-center'>{currStatus}</p>
                <div className=" flex space-x-2 pr-3">
                    <button
                        onClick={handleMissAppointment}
                        className="bg-yellow-500 text-white text-sm py-1 px-2 rounded-full hover:bg-yellow-600"
                    >
                        <MdCallMissed />
                    </button>
                    <button
                        onClick={handleCancelAppointment}
                        className="bg-red-500 text-white  py-1 px-2 rounded-full hover:bg-red-600"
                    >
                        <MdDeleteForever />
                    </button>
                </div>

            </div>
            <p className='text-md text-white font-semibold '>{name}</p>
            <p className='text-white text-md mt-5'>{specialization}</p>
            <p className='text-md text-white font-semibold'>{date}</p>
            <p className='text-md text-white font-semibold'>{currTime}</p>
            <p className='text-sm text-white mt-4'>Description:</p>
            <p className='text-sm text-white'>Sudden Eye pain during night.</p>
        </div>
    )
}

export default Card