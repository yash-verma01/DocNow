// 


import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import cancel_icon from "../../assets/cancel_icon.svg";
import { AdminContext } from '../../context/AdminContext';

const DoctorDashboard = () => {
    const { dashData, getDashData, atoken, appointmentCancel } = useContext(AdminContext);
    const { currency } = useContext(AppContext);

    useEffect(() => {
        if (atoken) {
            getDashData();
        }
    }, [atoken]);

    return (
        <div className="m-5">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-14" src={assets.earning_icon} alt="" />
                    <div>
                        <p className="text-lg font-semibold">
                            {currency} {dashData.earnings}
                        </p>
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
                {dashData.latestAppointments?.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
                    >
                        <img
                            className="w-10 rounded-full"
                            src={item.userData?.image || assets.default_profile}
                            alt=""
                        />
                        <div className="flex-1 text-sm">
                            <p className="text-gray-800 font-semibold">
                                {item.userData?.name || 'Unknown'}
                            </p>
                            <p className="text-gray-500">{item.slotDate}</p>
                        </div>
                        {item.cancelled?<p className='text-xs text-red-600 font-medium'>Cancelled</p>:item.isCompleted?<p className='text-xs text-green-600 font-medium'>Completed</p>:<img  onClick={() => appointmentCancel(item._id)} className="w-10 cursor-pointer"src={cancel_icon} alt="" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorDashboard;
