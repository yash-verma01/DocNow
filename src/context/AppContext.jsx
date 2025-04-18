import React from 'react'
import { createContext } from 'react'
import { doctors } from '../assets/assets_frontend/assets'
export const AppContext=createContext()
const currSymbol='$'
const AppContextProvider=(props)=>{
    const value={
        doctors,currSymbol
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
