import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currency='$'
    const calculateAge = (dob) => {
        if (!dob) return "N/A"; // Handle missing DOB

        const today = new Date();
        const birthDate = new Date(dob);

        if (isNaN(birthDate.getTime())) return "N/A"; // Invalid date format

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // If birthday hasn't occurred yet this year, subtract 1
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const value = { calculateAge, currency };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
