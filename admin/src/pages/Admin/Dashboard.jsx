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
        <div className="p-5">
            {/* Top Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <img className="w-12" src={assets.earning_icon} alt="Earnings" />
                    <div>
                        <p className="text-xl font-bold text-gray-800">
                            {currency} {dashData.earnings}
                        </p>
                        <p className="text-gray-500 text-sm">Total Earnings</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <img className="w-12" src={assets.appointment_icon} alt="Appointments" />
                    <div>
                        <p className="text-xl font-bold text-gray-800">{dashData.appointments}</p>
                        <p className="text-gray-500 text-sm">Appointments</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <img className="w-12" src={assets.patients_icon} alt="Patients" />
                    <div>
                        <p className="text-xl font-bold text-gray-800">{dashData.patients}</p>
                        <p className="text-gray-500 text-sm">Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Latest Appointments</h2>
                </div>
                <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                    {dashData.latestAppointments?.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
                            >
                                <img
                                    className="w-12 h-12 rounded-full object-cover"
                                    src={item.userData?.image || assets.default_profile}
                                    alt="Patient"
                                />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">
                                        {item.userData?.name || 'Unknown'}
                                    </p>
                                    <p className="text-gray-500 text-xs">{item.slotDate} • {item.slotTime}</p>
                                </div>
                                <div>
                                    {item.cancelled ? (
                                        <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">
                                            Cancelled
                                        </span>
                                    ) : item.isCompleted ? (
                                        <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                                            Completed
                                        </span>
                                    ) : (
                                        <img
                                            onClick={() => appointmentCancel(item._id)}
                                            className="w-8 cursor-pointer hover:scale-110 transition"
                                            src={cancel_icon}
                                            alt="Cancel"
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-6 text-gray-500 text-sm">No recent appointments</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
