import { useContext, useState } from "react";
import Navbar from "../components/DoctorNavbar";
import DoctorCalendar from "../components/DoctorCalendar";
import ManageSlots from "../components/ManageSlots";
import { DoctorContext } from "../context/DoctorContextProvider";
import ChangeDoctor from "../components/ChangeDoctor";







const DoctorDashboard = () => {
    const { content } = useContext(DoctorContext)
    return (
        <div className="w-full h-full overflow-auto">
            <Navbar />
            {content === 1 ? (
                <DoctorCalendar />
            ) : content === 2 ? (
                <ManageSlots />
            ) : content === 3 ? (
                <ChangeDoctor />
            ) : null}

        </div>

    );
};

export default DoctorDashboard;
