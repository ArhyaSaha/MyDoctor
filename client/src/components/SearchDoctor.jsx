import React, { useState, useContext, useEffect } from 'react'
import DoctorCard from './DoctorCard';
import axios from "axios";
import SearchandFilter from './SearchandFilter';
import { PatientContext } from '../context/PatientContextProvider';



const SearchDoctor = () => {
    const { doctors } = useContext(PatientContext);

    console.log('d', doctors)

    return (
        <div className='m-5 w-full'>
            <div className='w-full flex flex-col justify-center'>
                <SearchandFilter />
            </div>
            <div className='w-full pl-3 gap-x-8 flex flex-wrap '>
                {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctorId={doctor._id}
                            name={doctor.name}
                            email={doctor.email}
                            phone={doctor.phone}
                            specialty={doctor.specialty}
                            availableSlots={doctor.availableSlots}
                        />
                    ))
                ) : (
                    <p>No doctors found</p>
                )}


            </div>
        </div>
    )
}

export default SearchDoctor