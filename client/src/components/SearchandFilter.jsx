
import React, { useState, useContext, useEffect } from 'react';
// import dataContext from '../context/dataContext';
import { FaDownload } from "react-icons/fa";
import { PatientContext } from '../context/PatientContextProvider';


const SearchandFilter = () => {
    const {
        startDate, endDate, specialty, setSpecialty, doctors, setStartDate, setEndDate, setStartTime, setEndTime
    } = useContext(PatientContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    //Importing the necessary states and functions from the context
    const [parsedLogs, setParsedLogs] = useState([]);
    const [filterSpecialization, setFilterSpecialization] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSD, setTempSD] = useState('');
    const [tempED, setTempED] = useState('');
    const [tempST, setTempST] = useState('');
    const [tempET, setTempET] = useState('');

    //Handle Search and Filter Changes
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSpecializationChange = (event) => {
        setSpecialty(event.target.value);
        console.log('Specialty', specialty)
    };
    const handleStartDateChange = (event) => {
        setTempSD(event.target.value);
    };
    const handleEndDateChange = (event) => {
        setTempED(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setTempST(event.target.value);
    };
    const handleEndTimeChange = (event) => {
        setTempET(event.target.value);
    };

    useEffect(() => {
        console.log('Temp SD:', tempSD);
    }, [tempSD]);

    useEffect(() => {
        console.log('Temp ED:', tempED);
    }, [tempED]);

    useEffect(() => {
        console.log('Temp SD:', tempST);
    }, [tempST]);

    useEffect(() => {
        console.log('Temp ED:', tempET);
    }, [tempET]);


    // Functions to get unique Specializations and levels and populate them
    const populateSpecializations = () => {
        const Specializations = [];
        for (let doctor of doctors) {
            if (!Specializations.includes(doctor.specialty)) {
                Specializations.push(doctor.specialty);
            }
        }
        return Specializations;
    };



    const handleFilterClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleApplyFilters = () => {
        // Apply filters logic here
        setStartDate(tempSD);
        setEndDate(tempED);
        if ((tempET.length !== 0) || (tempST.length !== 0)) {
            if ((tempST.length !== 0) && tempET.length === 0) {
                setStartTime(tempST + ':00');
                setEndTime('23:59:59');
            } else if ((tempET.length !== 0) && tempST.length === 0) {
                setStartTime('00:00:00');
                setEndTime(tempET + ':00');
            } else if ((tempET.length !== 0) && (tempST.length !== 0)) {
                setStartTime(tempST + ':00');
                setEndTime(tempET + ':00');
            }
        }
        setIsDropdownOpen(false);
    };


    return (

        <div className='flex justify-center items-center w-full gap-3 mt-10 mb-4 '>
            <input
                type='text'
                placeholder='Search by Name...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='bg-gray-200 text-black rounded-full py-2 px-3 w-1/4'
            />


            <select
                value={specialty}
                onChange={handleSpecializationChange}
                className='bg-gray-200 text-black rounded-full py-2 px-3 text-center'
            >
                <option value=''>All Specialization</option>
                <option value='Cardiology'>Cardiology</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value='Pediatrician'>Pediatrician</option>
                {/* {populateSpecializations().map((Specialization, i) =>
                    <option key={i} value={Specialization} >{Specialization}</option>)} */}
            </select>



            <div className='relative'>
                <button
                    className='bg-gray-200 text-black px-4 py-2 rounded'
                    onClick={handleFilterClick}
                >
                    Filter
                </button>
                {isDropdownOpen && (
                    <div className='absolute mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg p-4'>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Start Date</label>
                            <input
                                type='date'
                                value={tempSD}
                                className='w-full px-3 py-2 border border-gray-300 rounded'
                                onChange={handleStartDateChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>End Date</label>
                            <input
                                type='date'
                                value={tempED}
                                className='w-full px-3 py-2 border border-gray-300 rounded'
                                onChange={handleEndDateChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Start Time</label>
                            <input
                                type='time'
                                value={tempST}
                                className='w-full px-3 py-2 border border-gray-300 rounded'
                                onChange={handleStartTimeChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>End Time</label>
                            <input
                                type='time'
                                value={tempET}
                                className='w-full px-3 py-2 border border-gray-300 rounded'
                                onChange={handleEndTimeChange}
                            />
                        </div>
                        <button
                            className='bg-green-500 text-white px-4 py-2 rounded'
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchandFilter