// 


import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext'; 
import cancel_icon from "../../assets/cancel_icon.svg";

const AllAppointment = () => {
  const { getAllAppointments, appointments, atoken, appointmentCancel } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
        All Appointments
      </h2>

      {/* Container */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-gray-100 text-gray-700 font-medium text-sm sticky top-0 z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status / Action</p>
        </div>

        {/* Appointments */}
        <div className="divide-y">
          {appointments.length === 0 && (
            <p className="text-center text-gray-500 py-6 text-sm">
              No appointments found.
            </p>
          )}

          {appointments.map((item, index) => (
            <div
              key={index}
              className="px-4 md:px-6 py-4 hover:bg-gray-50 transition"
            >
              {/* ✅ Mobile Card View */}
              <div className="flex flex-col gap-3 md:hidden border rounded-lg p-4 shadow-sm">
                {/* Patient & Doctor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border"
                      src={item.userData?.image}
                      alt={item.userData?.name}
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{item.userData?.name}</p>
                      <p className="text-xs text-gray-500">Age: {calculateAge(item.userData?.dob)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border bg-gray-100"
                      src={item.docData?.image}
                      alt={item.docData?.name}
                    />
                    <p className="text-gray-700 font-medium">{item.docData?.name}</p>
                  </div>
                </div>

                {/* Date, Fees, Status */}
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <p><span className="font-medium">Date:</span> {item.slotDate} • {item.slotTime}</p>
                  <p><span className="font-medium">Fees:</span> {currency}{item.amount || '-'}</p>
                  <div>
                    {item.cancelled ? (
                      <p className="text-xs font-semibold text-red-600">Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className="text-xs font-semibold text-green-600">Completed</p>
                    ) : (
                      <button
                        onClick={() => appointmentCancel(item._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
                      >
                        <img src={cancel_icon} alt="Cancel" className="w-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ Desktop Row View */}
              <div className="hidden md:grid md:grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-4">
                <p className="text-gray-500">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={item.userData?.image}
                    alt={item.userData?.name}
                  />
                  <p className="text-gray-800 font-medium">{item.userData?.name}</p>
                </div>

                {/* Age */}
                <p>{calculateAge(item.userData?.dob)}</p>

                {/* Date & Time */}
                <p className="text-sm text-gray-600">{item.slotDate} • {item.slotTime}</p>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border bg-gray-100"
                    src={item.docData?.image}
                    alt={item.docData?.name}
                  />
                  <p className="text-gray-700 font-medium">{item.docData?.name}</p>
                </div>

                {/* Fees */}
                <p className="text-gray-700 font-medium">
                  {currency}{item.amount || '-'}
                </p>

                {/* Status / Action */}
                {item.cancelled ? (
                  <p className="text-xs font-semibold text-red-600">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-xs font-semibold text-green-600">Completed</p>
                ) : (
                  <button
                    onClick={() => appointmentCancel(item._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    <img src={cancel_icon} alt="Cancel" className="w-5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;

