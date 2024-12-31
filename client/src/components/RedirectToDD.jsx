import React from 'react'
import { useNavigate } from "react-router-dom";


const RedirectToDD = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/doctor-dashboard");
    };

    return (
        <button
            onClick={handleRedirect}
            className="px-2 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Go to Doctor Dashboard
        </button>
    );
}

export default RedirectToDD