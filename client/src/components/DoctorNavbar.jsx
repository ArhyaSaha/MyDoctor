import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContextProvider';

import RedirectToPD from "../components/RedirectToPD";


const DoctorNavbar = () => {

    const { setContent, content, currentDoctorName } = useContext(DoctorContext)

    function doctorContentArea(option) {

        if (content == option) {
            return 'bg-white text-black rounded-b-none'
        }
        else {
            return 'hover:bg-green-400'
        }
    }
    function handleCalChange(val) {
        setContent(1);
    }
    function handleSlotChange() {
        setContent(2);
    }
    function handleAddChange() {
        setContent(3);
    }

    return (
        <div className='w-full h-14 flex flex-row items-center px-5 justify-between text-white  bg-green-500'>
            <div className='flex h-full items-center'>
                <p className='text-xl font-bold'>MyDoctor</p>
                <div className='ml-20 gap-8 flex items-center h-full'>
                    <div onClick={handleCalChange} className={` cursor-pointer ${doctorContentArea(1)} flex px-2 rounded-lg items-center h-full`}>
                        <p >My Calendar</p>
                    </div>
                    <div onClick={handleSlotChange} className={` cursor-pointer ${doctorContentArea(2)} flex px-2 rounded-lg items-center h-full`}>
                        <p>Manage Slots</p>
                    </div>
                    <div onClick={handleAddChange} className={` cursor-pointer ${doctorContentArea(3)} flex px-2 rounded-lg items-center h-full`}>
                        <p>Change Doctor</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <p className='text-xl '>{currentDoctorName}'s Dashboard</p>
                <RedirectToPD></RedirectToPD>
            </div>

        </div>
    )
}

export default DoctorNavbar