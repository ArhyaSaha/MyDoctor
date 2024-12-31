import React, { useState } from 'react'
import BookingModal from './BookingModal';

const DoctorCard = ({ doctorId, name, specialty, email, phone, availableSlots }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='w-64 h-64  text-white p-5 rounded-3xl bg-blue-400 my-4 '>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='font-semibold'>{specialty}</p>
            <p className='mt-[0.15rem] text-md'>5 ⭐</p>
            <p className='mt-[0.15rem] text-md'>1.4km</p>

            <p className='mt-[0.15rem] text-sm'>{phone}</p>

            <div className='text-sm mt-1 mb-2 justify-center'>
                <p> Address: 3717 Birch Street, Mooresville, Indiana, 46158</p>
            </div>
            <div className='mt-4 w-full flex items-center align-middle justify-center'>
                <button onClick={() => setIsModalOpen(true)} className='rounded-full hover:bg-black justify-center flex items-center text-center text-sm bg-slate-500 fit-content px-2 py-1 h-8'>Book Appointment</button>
            </div>
            {isModalOpen && (
                <BookingModal
                    doctorId={doctorId}
                    name={name}
                    specialty={specialty}
                    availableSlots={availableSlots}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

        </div>
    )
}

export default DoctorCard