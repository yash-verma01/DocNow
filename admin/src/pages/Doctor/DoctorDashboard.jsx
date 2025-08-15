import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets'; // Make sure this is the correct path
import { use } from 'react';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
    const { dashData, getDashboardData, dtoken,cancelAppointment,completeAppointment } = useContext(DoctorContext);
    const { currency } = useContext(AppContext);

    useEffect(() => {
        if (dtoken) {
            getDashboardData();
        }
    }, [dtoken]);


    return (
        <div className="m-5">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-14" src={assets.earning_icon} alt="" />
                    <div>
                        <p className="text-lg font-semibold">{currency} {dashData.earnings}</p>
                        <p className="text-gray-500">Earnings</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-14" src={assets.appointment_icon} alt="" />
                    <div>
                        <p className="text-lg font-semibold">{dashData.appointments}</p>
                        <p className="text-gray-500">Appointments</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-14" src={assets.patients_icon} alt="" />
                    <div>
                        <p className="text-lg font-semibold">{dashData.patients}</p>
                        <p className="text-gray-500">Patients</p>
                    </div>
                </div>
            </div>

            <div className="pt-4 border border-t-0">
                {dashData.latestAppointments.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
                    >
                        <img
                            className="w-10 rounded-full"
                            src={item.userData.image}
                            alt=""
                        />
                        <div className="flex-1 text-sm">
                            <p className="text-gray-800 font-semibold">
                                {item.userData.name}
                            </p>
                            <p className="text-gray-500">{item.slotDate}</p>
                        </div>
                       {
                                       item.cancelled
                                       ?<p className='text-red-400 font-medium'>Cancelled</p>
                                       :item.isCompleted
                                       ?<p className='text-green-400 font-medium'>Completed</p>
                                       : <div className="flex gap-3 justify-center">
                                       <img
                                         onClick={() => cancelAppointment(item._id)}
                                         src={assets.cancel_icon}
                                         alt="Cancel"
                                         className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                                       />
                                       <img
                                         onClick={() => completeAppointment(item._id)}
                                         src={assets.tick_icon}
                                         alt="Confirm"
                                         className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                                       />
                                     </div>
                                     }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorDashboard;
