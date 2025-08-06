import React from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'

export const AppContext=createContext()
const currSymbol='$'
const AppContextProvider=(props)=>{
    const [doctors,setDoctors]=useState([])

    const backendUrl=import.meta.env.VITE_BACKEND_URL


    const getDoctorData=async()=>{
        try {
            console.log("Fetching doctor data")
            const {data}=await axios.get(`${backendUrl}/api/doctor/lists`)
            if(data.success){
                setDoctors(data.doctors)
            }else{  
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(()=>{
        getDoctorData()
    },[])


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
