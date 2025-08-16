// import React from 'react'
// import { useContext } from 'react';
// import { AppContext } from '../../context/AppContext';
// import { DoctorContext } from '../../context/DoctorContext';
// import { use } from 'react';
// import { assets } from '../../assets/assets';
// import { useEffect } from 'react';

// const DoctorProfile = () => {
//     const { dtoken, profileData, setProfileData, getProfileData, updateProfileData } = useContext(DoctorContext);
//     const { currency, backendUrl } = useContext(AppContext);
//     useEffect(() => {
//         if (dtoken) {
//             getProfileData();
//         }
//     }, [dtoken]);
//     return profileData && (
//         <div>
//             <div className='flex flex-cols gap-4 m-5'>
//                 <div>
//                     <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
//                 </div>
//                 <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
//                     <p className='flex item-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//                     <div className='flex items-center gap-2 text-gray-500 text-sm'>
//                         {profileData.degree}-{profileData.speciality}
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//                     </div>

//                     <div>
//                         <p className='flex item-center gap-1 text-sm font-medium text-natural-800 mt-3'>About:</p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
//                     </div>
//                     <p className='text-gray-600 font-medium mt-4'>Appointment Fees:
//                         <span className='text-gray-800'>{currency}{profileData.fees}</span>
//                     </p>

//                     <div className='flex gap-2 py-2'>
//                         <p>Address:</p>
//                         <p className='text-sm'>
//                             {profileData.address?.line1}
//                             <br />
//                             {profileData.address?.line2}
//                         </p>
//                     </div>


//                     <div className='flex gap-1 pt-2'>
//                         <input type="checkbox" />
//                         <label htmlFor="">Available</label>
//                     </div>

//                     <button className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white'>Edit</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorProfile

import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
    const { dtoken, profileData, getProfileData,setProfileData ,backendUrl} = useContext(DoctorContext);
    const { currency } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const userData={
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available
            }
            const {data} = await axios.post(`${backendUrl}/api/doctor/update-profile`, userData, {
                headers: { dtoken }
            });
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        }catch (error) {
            console.error("Error updating profile:", error);
        }   
    }

    useEffect(() => {
        if (dtoken) {
            getProfileData();
        }
    }, [dtoken]);

    return profileData && (
        <div className="p-4 sm:p-6 w-full">
            <div className="bg-white rounded-lg shadow-lg p-5 border border-gray-200 w-full">
                
                {/* Image */}
                <div className="flex  mb-5">
                    <img
                        className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg border border-gray-100"
                        src={profileData.image}
                        alt={profileData.name}
                    />
                </div>

                {/* Doctor Info */}
                <div className=" sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                    <div className="flex  sm:justify-start  gap-3 text-gray-600 mt-1 flex-wrap">
                        <span>{profileData.degree} - {profileData.speciality}</span>
                        <span className="px-2 py-0.5 border rounded-full text-xs bg-gray-50">
                            {profileData.experience}
                        </span>
                    </div>

                    {/* About */}
                    <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700">About:</p>
                        <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
                    </div>

                    {/* Fees */}
                    <p className="mt-3 text-gray-700 font-medium">
                        Appointment Fees: <span className="text-gray-900 font-semibold">{currency}{isEdit?<input type='number' onChange={(e) => setProfileData(prev=>({...prev, fees: e.target.value}))} value={profileData.fees}></input>:profileData.fees}</span>
                    </p>

                    {/* Address */}
                    <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700">Address:</p>
                        <p className="text-sm text-gray-600">
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address?.line1} /> : profileData.address?.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address?.line2} /> : profileData.address?.line2}
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="flex  sm:justify-start items-center gap-2 mt-3">
                        <input onChange={(e) => setProfileData(prev => ({ ...prev, available: e.target.checked }))} checked={profileData.available} type="checkbox" />
                        <label className="text-sm text-gray-700">Available</label>
                    </div>

                    {/* Edit Button */}
                    <div className="mt-5 flex  sm:justify-start">
                       
                        {isEdit
                        ?<button onClick={() => updateProfile()} className="px-5 py-1.5 border border-indigo-600 text-indigo-600 text-sm rounded-full hover:bg-indigo-600 hover:text-white transition">
                            Save
                        </button>:<button onClick={() => setIsEdit(true)} className="px-5 py-1.5 border border-indigo-600 text-indigo-600 text-sm rounded-full hover:bg-indigo-600 hover:text-white transition">
                            Edit
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;


