import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors}=useContext(AppContext)
    const [relateDoc,setRelateDoc]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        if(doctors.length>0&&speciality)
        {
            const doctorData=doctors.filter((doc)=>doc.speciality===speciality&&doc._id!=docId)
            setRelateDoc(doctorData)
        }
    },[doctors,docId,speciality])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through out Extensive Lists of Doctors</p>
      <div className='grid grid-cols-auto w-full gap-4 pt-5 gap-y-5 px-3 sm:px-0'>
        {relateDoc.slice(0,5).map((item,index)=>(
        <div onClick={()=>{navigate(`/appointment/${item._id}`),scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
        </div>
        ))}
      </div>
      <button onClick={()=>navigate(`/doctors`)}className='bg-blue-50 text-gray-800 px-12 py-3 rounded-full mt-10'>More</button>

    </div>
  )
}

export default RelatedDoctors
