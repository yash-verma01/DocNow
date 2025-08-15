// import React, { useContext, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// const DoctorAppointments = () => {
//   const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
//   const {calculateAge,currency}=useContext(AppContext)

//   useEffect(() => {
//     if (dtoken) {
//       getAppointments();
//     }
//   }, [dtoken]);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>

//       {/* Container */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
//         {/* Table Header */}
//         <div className="hidden sm:grid grid-cols-[0.1fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
// {appointments.map((item, index) => (
//   <div
//     key={index}
//     className="grid grid-cols-2 sm:grid-cols-[0.1fr_3fr_1fr_1fr_3fr_1fr_1fr] items-center py-3 px-6 border-b last:border-none hover:bg-gray-50 transition"
//   >
//     {/* Serial Number */}
//     <p className="font-medium">{index + 1}</p>

//     {/* Patient Info */}
//     <div className="flex items-center gap-3">
//       <img
//         src={item.userData.image}
//         alt={item.userData.name}
//         className="w-10 h-10 rounded-full object-cover border"
//       />
//       <p className="font-medium">{item.userData.name}</p>
//     </div>

//     {/* Payment */}
//     <div>
//       <p
//         className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
//           item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
//         }`}
//       >
//         {item.payment ? 'Online' : 'CASH'}
//       </p>
//     </div>

//     {/* Age */}
//     <p>{calculateAge(item.userData.dob)}</p>

//     {/* Date & Time */}
//     <p>
//       {item.slotDate}, {item.slotTime}
//     </p>

//     {/* Fees */}
//     <p className="font-medium text-green-600">
//       {currency}{item.amount}
//     </p>

//     {/* Action Icons */}
//     <div className="flex gap-3">
//       <img
//         src={assets.cancel_icon}
//         alt="Cancel"
//         className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//       />
//       <img
//         src={assets.tick_icon}
//         alt="Confirm"
//         className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//       />
//     </div>
//   </div>
// ))}


//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;
// import React, { useContext, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// const DoctorAppointments = () => {
//   const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
//   const { calculateAge, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dtoken) {
//       getAppointments();
//     }
//   }, [dtoken]);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>

//       {/* Container */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
//         {/* Table Header */}
//         <div className="hidden sm:grid grid-cols-[0.1fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* Table Rows */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-2 sm:grid-cols-[0.1fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-3 py-3 px-6 border-b last:border-none hover:bg-gray-50 transition"
//           >
//             {/* Serial Number */}
//             <p className="font-medium">{index + 1}</p>

//             {/* Patient Info */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={item.userData.image}
//                 alt={item.userData.name}
//                 className="w-10 h-10 rounded-full object-cover border"
//               />
//               <p className="font-medium break-words">{item.userData.name}</p>
//             </div>

//             {/* Payment */}
//             <div>
//               <p
//                 className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
//                   item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
//                 }`}
//               >
//                 {item.payment ? 'Online' : 'CASH'}
//               </p>
//             </div>

//             {/* Age */}
//             <p>{calculateAge(item.userData.dob)}</p>

//             {/* Date & Time */}
//             <p className="break-words">
//               {item.slotDate}, {item.slotTime}
//             </p>

//             {/* Fees */}
//             <p className="font-medium text-green-600">
//               {currency}
//               {item.amount}
//             </p>

//             {/* Action Icons */}
//             <div className="flex gap-3">
//               <img
//                 src={assets.cancel_icon}
//                 alt="Cancel"
//                 className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//               />
//               <img
//                 src={assets.tick_icon}
//                 alt="Confirm"
//                 className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;



// import React, { useContext, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// const DoctorAppointments = () => {
//   const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
//   const { calculateAge, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dtoken) {
//       getAppointments();
//     }
//   }, [dtoken]);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>

//       {/* Table Container */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
//         {/* Table Header (Desktop only) */}
//         <div className="hidden sm:grid grid-cols-[0.1fr_3fr_1fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* Table Rows */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 sm:grid-cols-[0.1fr_3fr_1fr_1fr_2fr_1fr_1fr] items-center gap-3 py-4 px-4 sm:px-6 border-b last:border-none hover:bg-gray-50 transition"
//           >
//             {/* Serial Number */}
//             <p className="font-medium">{index + 1}</p>

//             {/* Patient Info */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={item.userData.image}
//                 alt={item.userData.name}
//                 className="w-10 h-10 rounded-full object-cover border"
//               />
//               <p className="font-medium truncate max-w-[150px]">{item.userData.name}</p>
//             </div>

//             {/* Payment */}
//             <p>
//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
//                   item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
//                 }`}
//               >
//                 {item.payment ? 'Online' : 'CASH'}
//               </span>
//             </p>

//             {/* Age */}
//             <p>{calculateAge(item.userData.dob)}</p>

//             {/* Date & Time */}
//             <p className="truncate">
//               {item.slotDate}, {item.slotTime}
//             </p>

//             {/* Fees */}
//             <p className="font-medium text-green-600">
//               {currency}
//               {item.amount}
//             </p>

//             {/* Action Icons */}
//             <div className="flex gap-3 justify-start sm:justify-center">
//               <img onClick={() => cancelAppointment(item._id)}
//                 src={assets.cancel_icon}
//                 alt="Cancel"
//                 className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//               />
//               <img onClick={() => completeAppointment(item._id)}
//                 src={assets.tick_icon}
//                 alt="Confirm"
//                 className="w-6 h-6 cursor-pointer hover:scale-110 transition"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;


// 



import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 text-sm overflow-hidden">
        
        {/* Table Header - Desktop */}
        <div className="hidden lg:grid grid-cols-[0.1fr_3fr_1fr_1fr_2fr_1fr_1fr] py-3 px-4 border-b bg-gray-50 font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <React.Fragment key={index}>
            {/* Desktop Row */}
            <div className="hidden lg:grid grid-cols-[0.1fr_3fr_1fr_1fr_2fr_1fr_1fr] items-center gap-3 py-3 px-4 border-b last:border-none hover:bg-gray-50 transition">
              <p>{index + 1}</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p className="font-medium truncate">{item.userData.name}</p>
              </div>
              <p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {item.payment ? 'Online' : 'CASH'}
                </span>
              </p>
              <p>{calculateAge(item.userData.dob)}</p>
              <p className="truncate">
                {item.slotDate}, {item.slotTime}
              </p>
              <p className="font-medium text-green-600">
                {currency}
                {item.amount}
              </p>

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

            {/* Mobile Card */}
            <div className="lg:hidden border-b last:border-none p-4 flex flex-col gap-3 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <p className="font-medium text-base">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">{item.slotDate}, {item.slotTime}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Payment:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {item.payment ? 'Online' : 'CASH'}
                  </span>
                </p>
                <p><span className="font-semibold">Age:</span> {calculateAge(item.userData.dob)}</p>
                <p><span className="font-semibold">Fees:</span> {currency}{item.amount}</p>
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
