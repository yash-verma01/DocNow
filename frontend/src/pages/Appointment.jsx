import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Appointment = () => {
  const {docId}=useParams()
  const {doctors,currSymbol,token,getDoctorData,backendUrl}=useContext(AppContext)
  const [docInfo,setDocInfo]=useState(null)
  

const navigate=useNavigate()

  const [docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }


  const getAvailableSlots=async()=>{
    setDocSlots([])

    const today=new Date()
    for(let i=0;i<7;i++)
    {
      let currDate=new Date(today)
      currDate.setDate(today.getDate()+i)
      //set end time of date
      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)
        //set hours
        if(today.getDate()===currDate.getDate())
        {
          currDate.setHours(currDate.getHours()>10?currDate.getHours()+1:10)
          currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
        }
        else{
          currDate.setHours(10)
          currDate.setMinutes(0)
        }
        const timeSlots=[]
        while(currDate<endTime)
        {
          let formatTime=currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

            timeSlots.push({
              datetime:new Date(currDate),
              time:formatTime
            })
          
          currDate.setMinutes(currDate.getMinutes()+30)

        }
        setDocSlots(prev=>[...prev,timeSlots])
      
    }
  }

  const bookAppointment=async()=>{
    if(!token)
    {
      toast.warn('Please login to book an appointment')
      return navigate('/login')
    }
    try {
      const date=docSlots[slotIndex][0].datetime
      let day=date.getDate()
      let month=date.getMonth()+1
      let year=date.getFullYear()
      const slotDate=day+'-'+month+'-'+year
      const {data}=await axios.post(`${backendUrl}/api/user/book-appointment`,{
        docId,
        slotDate,
        slotTime
      }, {
        headers: {token}
      })
      if(data.success)
      {
        toast.success('Appointment booked successfully')
        getDoctorData()
        navigate('/my-appointment')
      }
      
      else
      {
        toast.error(data.message || 'Failed to book appointment')
      }
    } catch (error) {
      toast.error('Failed to book appointment')
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])
  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])
  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])





  return docInfo &&(
    <div>
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8  py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
          <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
            <p className=' text-gray-500 mt-5 font-medium'>
              Appointment Fees:<span className='text-gray-600'>{currSymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700  '>
        <p>
          Booking Slots
        </p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)}key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white ':'border border-gray-500'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 '>
          {
            docSlots.length>0 &&docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ?'bg-primary text-white':'text-gray-400 border border-gray-400'}`}>
                {
                  item.time.toLowerCase()
                }
              </p>
            )) 
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-11 py-3 rounded-full mt-7'>Book Appointment</button>
      </div>
      {/* list related doctor  */}
      {docInfo && <RelatedDoctors docId={docId} speciality={docInfo.speciality}></RelatedDoctors>}
    </div>
  )
}

export default Appointment
