// import React, { useContext, useState } from 'react'
//  import { NavLink } from 'react-router-dom'
// import { AdminContext } from '../context/AdminContext'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'

// const Sidebar = () => {
//   const { atoken } = useContext(AdminContext)
//   const [open, setOpen] = useState(false)
//   const { dtoken } = useContext(DoctorContext)

//   if (!atoken) return null

//   return (
//     <>
//       {/* Hamburger for mobile */}
//       <button
//         className="md:hidden fixed top-20 left-4 z-50 bg-white rounded-full shadow p-2"
//         onClick={() => setOpen(true)}
//       >
//         <img src={assets.menu_icon} alt="Menu" className="w-7 h-7" />
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-indigo-100 flex flex-col py-8 px-4 z-50
//           transition-transform duration-300
//           ${open ? 'translate-x-0' : '-translate-x-full'}
//           md:static md:translate-x-0 md:block
//         `}
//       >
//         {/* Close button for mobile */}
//         <div className="flex justify-end md:hidden mb-6">
//           <button onClick={() => setOpen(false)}>
//             <img src={assets.cross_icon} alt="Close" className="w-7 h-7" />
//           </button>
//         </div>
//         <ul className="flex flex-col gap-2">
//           <NavLink
//             to="/admin-dashboard"
//             onClick={() => setOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//               ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
//             }
//           >
//             <img src={assets.home_icon} alt="" className="w-6 h-6" />
//             <span>Dashboard</span>
//           </NavLink>
//           <NavLink
//             to="/all-appointments"
//             onClick={() => setOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//               ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
//             }
//           >
//             <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
//             <span>All Appointments</span>
//           </NavLink>
//           <NavLink
//             to="/add-doctor"
//             onClick={() => setOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//               ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
//             }
//           >
//             <img src={assets.add_icon} alt="" className="w-6 h-6" />
//             <span>Add Doctor</span>
//           </NavLink>
//           <NavLink
//             to="/doctor-list"
//             onClick={() => setOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//               ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
//             }
//           >
//             <img src={assets.people_icon} alt="" className="w-6 h-6" />
//             <span>Doctor List</span>
//           </NavLink>
//         </ul>
//       </aside>
//     </>
//   )
// }

// export default Sidebar




// import React, { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { assets } from "../assets/assets";

// const Sidebar = () => {
//   const { atoken } = useContext(AdminContext);
//   const { dtoken } = useContext(DoctorContext);
//   const [open, setOpen] = useState(false);

//   // Hide sidebar completely if neither token exists
//   if (!atoken && !dtoken) return null;

//   // Admin Links
//   const adminLinks = [
//     { to: "/admin-dashboard", label: "Dashboard", icon: assets.home_icon },
//     { to: "/all-appointments", label: "All Appointments", icon: assets.appointment_icon },
//     { to: "/add-doctor", label: "Add Doctor", icon: assets.add_icon },
//     { to: "/doctor-list", label: "Doctor List", icon: assets.people_icon },
//   ];

//   // Doctor Links
//   const doctorLinks = [
//     { to: "/doctor-dashboard", label: "Dashboard", icon: assets.home_icon },
//     { to: "/doctor-appointments", label: "Appointments", icon: assets.appointment_icon },
//     { to: "/doctor-profile", label: "Profile", icon: assets.people_icon },
//   ];

//   // Decide which links to show
//   const linksToShow = atoken ? adminLinks : doctorLinks;

//   return (
//     <>
//       {/* Hamburger for mobile */}
//       <button
//         className="md:hidden fixed top-20 left-4 z-50 bg-white rounded-full shadow p-2"
//         onClick={() => setOpen(true)}
//       >
//         <img src={assets.menu_icon} alt="Menu" className="w-7 h-7" />
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-indigo-100 flex flex-col py-8 px-4 z-50
//           transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           md:static md:translate-x-0 md:block
//         `}
//       >
//         {/* Close button for mobile */}
//         <div className="flex justify-end md:hidden mb-6">
//           <button onClick={() => setOpen(false)}>
//             <img src={assets.cross_icon} alt="Close" className="w-7 h-7" />
//           </button>
//         </div>

//         {/* Menu Items */}
//         <ul className="flex flex-col gap-2">
//           {linksToShow.map((link, index) => (
//             <NavLink
//               key={index}
//               to={link.to}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//                 ${isActive ? "bg-indigo-700 text-white shadow" : "text-indigo-800 hover:bg-indigo-50"}`
//               }
//             >
//               <img src={link.icon} alt="" className="w-6 h-6" />
//               <span>{link.label}</span>
//             </NavLink>
//           ))}
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;









// import React, { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { assets } from "../assets/assets";

// const Sidebar = () => {
//   const { atoken } = useContext(AdminContext);
//   const { dtoken } = useContext(DoctorContext);
//   const [open, setOpen] = useState(false);

//   // Hide sidebar completely if neither token exists
//   if (!atoken && !dtoken) return null;

//   // Admin Links
//   const adminLinks = [
//     { to: "/admin-dashboard", label: "Dashboard", icon: assets.home_icon },
//     { to: "/all-appointments", label: "All Appointments", icon: assets.appointment_icon },
//     { to: "/add-doctor", label: "Add Doctor", icon: assets.add_icon },
//     { to: "/doctor-list", label: "Doctor List", icon: assets.people_icon },
//   ];

//   // Doctor Links
//   const doctorLinks = [
//     { to: "/doctor-dashboard", label: "Dashboard", icon: assets.home_icon },
//     { to: "/doctor-appointments", label: "Appointments", icon: assets.appointment_icon },
//     { to: "/doctor-profile", label: "Profile", icon: assets.people_icon },
//   ];

//   // Decide which links to show
//   const linksToShow = atoken ? adminLinks : doctorLinks;

//   return (
//     <>
//       {/* Hamburger for mobile */}
// <button
//   className="md:hidden fixed top-20 right-4 z-50 bg-white rounded-full shadow p-3 hover:bg-gray-100 transition"
//   onClick={() => setOpen(true)}
// >
//   <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
//   <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
//   <span className="block w-6 h-0.5 bg-gray-800"></span>
// </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-indigo-100 flex flex-col py-8 px-4 z-50
//           transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//        {/* Close button for mobile */}
// <div className="flex justify-end md:hidden mb-6">
//   <button
//     onClick={() => setOpen(false)}
//     className="p-2 rounded-full hover:bg-gray-100 transition"
//   >
//     ✕
//   </button>
// </div>
//         {/* Menu Items */}
//         <ul className="flex flex-col gap-2">
//           {linksToShow.map((link, index) => (
//             <NavLink
//               key={index}
//               to={link.to}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
//                 ${isActive ? "bg-indigo-700 text-white shadow" : "text-indigo-800 hover:bg-indigo-50"}`
//               }
//             >
//               <img src={link.icon} alt="" className="w-6 h-6" />
//               <span>{link.label}</span>
//             </NavLink>
//           ))}
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;






import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const [open, setOpen] = useState(false);

  if (!atoken && !dtoken) return null;

  const adminLinks = [
    { to: "/admin-dashboard", label: "Dashboard", icon: assets.home_icon },
    { to: "/all-appointments", label: "All Appointments", icon: assets.appointment_icon },
    { to: "/add-doctor", label: "Add Doctor", icon: assets.add_icon },
    { to: "/doctor-list", label: "Doctor List", icon: assets.people_icon },
  ];

  const doctorLinks = [
    { to: "/doctor-dashboard", label: "Dashboard", icon: assets.home_icon },
    { to: "/doctor-appointments", label: "Appointments", icon: assets.appointment_icon },
    { to: "/doctor-profile", label: "Profile", icon: assets.people_icon },
  ];

  const linksToShow = atoken ? adminLinks : doctorLinks;

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
        onClick={() => setOpen(true)}
      >
        <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-800"></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white shadow-xl border-r border-indigo-100 flex flex-col py-8 px-4 z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-auto
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden mb-6">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-2">
          {linksToShow.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
                ${isActive ? "bg-indigo-700 text-white shadow" : "text-indigo-800 hover:bg-indigo-50"}`
              }
            >
              <img src={link.icon} alt="" className="w-6 h-6" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

