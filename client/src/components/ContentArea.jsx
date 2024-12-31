import React, { useState, useContext, useEffect } from 'react'
import MyAppointment from './MyAppointment';
import SearchDoctor from './SearchDoctor';
import { PatientContext } from '../context/PatientContextProvider';
import ChangePatient from './ChangePatient';




const ContentArea = () => {

    const { sidebarVal } = useContext(PatientContext);


    return (
        <>
            {sidebarVal === 1 ? (
                <MyAppointment />
            ) : sidebarVal === 2 ? (
                <SearchDoctor />
            ) : sidebarVal === 3 ? (
                <ChangePatient />
            ) : null}
        </>
    )
}

export default ContentArea