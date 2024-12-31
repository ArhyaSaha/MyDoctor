import React from 'react'
import { useNavigate } from "react-router-dom";

const RedirectToPD = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/patient-dashboard");
    };

    return (
        <button
            onClick={handleRedirect}
            className="px-2 py-2 text-sm fit-content bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Go to Patient Dashboard
        </button>
    );
};


export default RedirectToPD