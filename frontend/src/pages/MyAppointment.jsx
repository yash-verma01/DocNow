import React, { useContext,useState,useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MyAppointment = () => {

  const {backendUrl,token} = useContext(AppContext);
  const [appointments,setAppointments] = useState([])
  const navigate = useNavigate();
  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/list-appointments`, {
        headers: {token}
        })

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    }
  };
  const initPayment = (order) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay`, response, { headers: { token } });
          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments')
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Failed to verify payment");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Function to handle Razorpay payment
  const appointmentRazorpay = async (appointmentId) => {
  try {
    const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, {
      headers: { token }
    });
    if (data.success) {
      // Handle successful payment
      toast.success("Payment successful");
      initPayment(data.order);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    toast.error("Failed to process payment");
  }
};

useEffect(() => {
  if(token) {
    getUserAppointments();
  }
}, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div> 
    <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
    <div>
    {appointments. slice(0,5).map((item, index)=>( 
    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>

    <div>
    <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
    </div>

    <div className='flex-1 text-sm text-zinc-600'>
    <p className=' text-neutral-800 font-semibold'>{item.docData.name} </p>
    <p>{item.docData.speciality}</p>
    <p className=' •text-zinc-700 font-medium mt-1'>Address:</p>
    <p className='text-xs'>{item.docData.address.line1}</p>
    <p className='text-xs'>{item.docData.address.line2}</p>
    <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
    </div>

    <div></div>

    <div className='flex flex-col gap-2 justify-end'>
      {!item.cancelled && item.payment && <button className='text-sm text-green-500 text-center sm:min-w-48 py-2 border hover:bg-green-700 hover:text-white transition-all duration-200'>Paid</button>}
      {!item.cancelled && !item.payment && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-200'>Pay Online</button>}
      {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-700 hover:text-white transition-all duration-200'>Cancel Appointment</button>}
      {item.cancelled && <button className='text-sm text-red-500 text-center sm:min-w-48 py-2 border hover:bg-red-700 hover:text-white transition-all duration-200'>Cancelled appointment</button>}
    </div>
    </div>
    ))}
    </div>
    </div>
  )
}

export default MyAppointment
