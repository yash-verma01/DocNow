import { createContext } from "react";
import { useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const[dtoken,setDToken]=useState(localStorage.getItem('dtoken') ?localStorage.getItem('dtoken'): '' );
    const value = {
        backendUrl,dtoken,setDToken
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};
export default DoctorContextProvider;