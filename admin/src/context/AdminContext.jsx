import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

 const AdminContextProvider = ({ children }) => {
    const [atoken, setAToken] = useState(localStorage.getItem('atoken') ?localStorage.getItem('atoken'): '' );   
    const[doctors, setDoctors] = useState([]);
    const[appointments, setAppointments] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`, {},{headers:{atoken}})
            if (data.success) {
                console.log(data)
                setDoctors(data.doctors);
                console.log(data.doctors)
            } 
            else {
                toast.error(data.message);
                console.error("Failed to fetch doctors:", data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const changeAvailability = async (docId) => {
        console.log("Changing availability for doctor:", docId);
        try {
            console.log(`${backendUrl}/api/admin/change-availability`);
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`, {docId}, {headers: {atoken}});
            console.log("Response from changeAvailability:", data);
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh the list of doctors after changing availability
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error changing doctor availabilitykkkkk:", error);
        }
    };

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/appointments`, {headers: {atoken}});
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const value = {
        atoken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        setAppointments
    };
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
export default AdminContextProvider;
