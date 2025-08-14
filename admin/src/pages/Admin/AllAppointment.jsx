import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext'; 
import { toast } from 'react-toastify';
import cancel_icon from "../../assets/cancel_icon.svg";

const AllAppointment = () => {
  const { getAllAppointments, appointments, atoken } = useContext(AdminContext);
  const { calculateAge , currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-semibold">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Header (hidden on small screens) */}
        <div className="hidden sm:grid grid-cols-[0.1fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {console.log(appointments)}
        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid sm:grid-cols-[0.1fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            {/* Serial Number (hidden on small screens) */}
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{item.slotDate} {item.slotTime}</p>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <img
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                src={item.docData.image}
                alt=""
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount || '-'}</p>
            {item.cancelled?<p className='text-xs text-red-600 font-medium'>Cancelled</p>:<img className="w-10 cursor-pointer"src={cancel_icon} alt="" />}

            </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
