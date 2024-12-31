import React, { useContext } from 'react'
import { BsCalendarEventFill } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { PatientContext } from '../context/PatientContextProvider';

const Sidebar = () => {

    const { sidebarVal, setSidebarVal } = useContext(PatientContext);

    function myAppHandler() {
        setSidebarVal(1);
    }
    function searchDocHandler() {
        setSidebarVal(2);
    }
    function changePatientHandler() {
        setSidebarVal(3);
    }
    function highlightColor(option) {
        if (sidebarVal == option) {
            return 'bg-slate-400 rounded w-full'
        }

    }

    return (
        <div className='w-64 h-full bg-green-200'>
            <div onClick={myAppHandler} className={`flex cursor-pointer flex-row p-4 items-center gap-4 ${highlightColor(1)} `}>
                <BsCalendarEventFill />
                <p className='text-md'>My Appointments</p>
            </div>
            <div onClick={searchDocHandler} className={`flex cursor-pointer flex-row p-4 items-center gap-4 ${highlightColor(2)} `}>
                <FaSearchPlus />
                <p className='text-md text-center'>Search Doctors</p>
            </div>
            <div onClick={changePatientHandler} className={`flex cursor-pointer flex-row p-4 items-center gap-4 ${highlightColor(3)} `}>
                <FaExchangeAlt />
                <p className='text-md text-center'>Change Patient</p>
            </div>
        </div>
    )
}

export default Sidebar