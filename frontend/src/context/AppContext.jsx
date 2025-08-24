import React from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'

export const AppContext = createContext()
const currSymbol = '$'
const backendUrl="https://docnow-backend-48fq.onrender.com"
//const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
console.log("Backend URL:", backendUrl)

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(null)



    const getDoctorData = async () => {
        try {
            console.log("Fetching doctor data")
            const { data } = await axios.get(`${backendUrl}/api/doctor/lists`)
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token }
            })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(false)
        }
    }, [token])

    const value = {
        doctors, currSymbol, token, setToken, backendUrl,userData, setUserData,loadUserProfileData,getDoctorData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
