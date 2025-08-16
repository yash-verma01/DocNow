// 



import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    getDashboardData,
    dtoken,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashboardData();
    }
  }, [dtoken]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow hover:shadow-md transition">
          <img className="w-12 h-12" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-500 text-sm">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow hover:shadow-md transition">
          <img
            className="w-12 h-12"
            src={assets.appointment_icon}
            alt="Appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow hover:shadow-md transition">
          <img className="w-12 h-12" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashData.patients}
            </p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            Latest Appointments
          </h2>
        </div>
        <div>
          {dashData.latestAppointments.length === 0 ? (
            <p className="text-center text-gray-500 py-6 text-sm">
              No recent appointments.
            </p>
          ) : (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 border-b hover:bg-gray-50 transition"
              >
                {/* Patient Image */}
                <img
                  className="w-12 h-12 rounded-full object-cover border"
                  src={item.userData.image}
                  alt={item.userData.name}
                />

                {/* Patient Info */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-500 text-xs">{item.slotDate}</p>
                </div>

                {/* Status / Actions */}
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium text-sm">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 font-medium text-sm">
                      Completed
                    </p>
                  ) : (
                    <div className="flex gap-3">
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
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

