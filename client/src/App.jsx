import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard"
import { PatientContextProvider } from './context/PatientContextProvider';
import './App.css'
import DoctorContextProvider from "./context/DoctorContextProvider";


function App() {
  return (
    <div className="h-full">
      <DoctorContextProvider>
        <PatientContextProvider>
          <Router>
            <Routes>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
            </Routes>
          </Router>
        </PatientContextProvider>
      </DoctorContextProvider>
    </div>
  );
}

export default App;
