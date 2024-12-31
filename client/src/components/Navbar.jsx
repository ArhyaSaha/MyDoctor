import React from 'react'
import RedirectToDD from './RedirectToDD'
import { useContext } from 'react'
import { PatientContext } from '../context/PatientContextProvider'



const Navbar = () => {
    const { currentPatientName } = useContext(PatientContext)

    return (
        <div className='w-full h-14 flex flex-row items-center px-5 justify-between text-white text-xl bg-green-500'>
            <p className='font-bold'>MyDoctor</p>
            <div className='flex gap-5 items-center'>
                <p className=' '>{currentPatientName}'s Dashboard</p>
                <RedirectToDD></RedirectToDD>
            </div>
        </div>
    )
}

export default Navbar