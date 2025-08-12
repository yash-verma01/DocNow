import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const value = {}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;
// This context can be used to manage global state or functions that need to be accessed throughout the application.
