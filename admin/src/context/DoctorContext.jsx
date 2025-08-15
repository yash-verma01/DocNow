import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [appointments, setAppointments] = useState([]);
    const [dtoken, setDToken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '');
    const [dashData, setDashData] = useState({
        earnings: 0,
        patients: 0,
        appointments: 0,
        latestAppointments: []
    });
    const[profileData,setProfileData] = useState({});

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
                headers: { dtoken }
            });
            if (data.success) {
                setAppointments(data.appointments);
                console.log("Appointments fetched successfully:", data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error(error.message)
        }
    };
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, {
                headers: { dtoken }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error completing appointment:", error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
                headers: { dtoken }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
            toast.error(error.message);
        }
    };



    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
                headers: { dtoken }
            });
            if (data.success) {
                setDashData(data.dashData);
                console.log("Dashboard data fetched successfully:", data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error(error.message);
        }
    };

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
                headers: { dtoken }
            });
            if (data.success) {
                setProfileData(data.profileData);
                console.log("Profile data fetched successfully:", data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
            toast.error(error.message);
        }
    };
    const updateProfileData = async (profileData) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, profileData, {
                headers: { dtoken }
            });
            if (data.success) {
                toast.success(data.message);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating profile data:", error);
            toast.error(error.message);
        }
    };

    const value = {
        backendUrl, dtoken, setDToken, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, dashData, setDashData, getDashboardData, profileData, setProfileData, getProfileData, updateProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;