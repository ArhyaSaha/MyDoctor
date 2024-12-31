import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';

const PatientDashboard = () => {



    return (
        <>

            <Navbar />
            <div className='w-full h-full flex flex-row'>
                <Sidebar />
                <ContentArea />

            </div>
        </>
    )
}

export default PatientDashboard