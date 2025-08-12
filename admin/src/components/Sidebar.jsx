import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { atoken } = useContext(AdminContext)
  const [open, setOpen] = useState(false)

  if (!atoken) return null

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-white rounded-full shadow p-2"
        onClick={() => setOpen(true)}
      >
        <img src={assets.menu_icon} alt="Menu" className="w-7 h-7" />
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
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-indigo-100 flex flex-col py-8 px-4 z-50
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:block
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden mb-6">
          <button onClick={() => setOpen(false)}>
            <img src={assets.cross_icon} alt="Close" className="w-7 h-7" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          <NavLink
            to="/admin-dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
              ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
            }
          >
            <img src={assets.home_icon} alt="" className="w-6 h-6" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/all-appointments"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
              ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
            <span>All Appointments</span>
          </NavLink>
          <NavLink
            to="/add-doctor"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
              ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
            }
          >
            <img src={assets.add_icon} alt="" className="w-6 h-6" />
            <span>Add Doctor</span>
          </NavLink>
          <NavLink
            to="/doctor-list"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
              ${isActive ? 'bg-indigo-700 text-white shadow' : 'text-indigo-800 hover:bg-indigo-50'}`
            }
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <span>Doctor List</span>
          </NavLink>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
