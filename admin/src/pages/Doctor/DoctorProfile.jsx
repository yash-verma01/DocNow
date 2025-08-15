import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorProfile = () => {
    const{dtoken,profileData,setProfileData,getProfileData,updateProfileData  } = useContext(DoctorContext);
    const {currency}=useContext(AppContext);
  return (
    <div>   
      
    </div>
  )
}

export default DoctorProfile
