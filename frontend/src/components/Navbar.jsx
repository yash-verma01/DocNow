import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets.js'
import {NavLink, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu,setShowMenu]=useState(false)
  const {token, setToken,userData} = useContext(AppContext)
  const handleLogout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success("Logged out successfully")
    navigate('/')
  }
  return (

    <div className='flex items-center justify-between text-sm py-4 mb-3 border-b border-b-gray-400'>

      <img onClick={()=>{navigate('/')}} className='w-36 cursor-pointer' src={assets.logo} alt='' />
      <ul className='hidden md:flex items-center gap-7 font-medium'>
        <NavLink to='/'><li className='py-1 px-2 hover:text-indigo-700 transition'>HOME</li></NavLink>
        <NavLink to='/doctors'><li className='py-1 px-2 hover:text-indigo-700 transition'>ALL DOCTORS</li></NavLink>
        <NavLink to='/about'><li className='py-1 px-2 hover:text-indigo-700 transition'>ABOUT</li></NavLink>
        <NavLink to='/contact'><li className='py-1 px-2 hover:text-indigo-700 transition'>CONTACT</li></NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {token && userData? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>{navigate('my-profile')}} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>{navigate('my-appointment')}} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={()=>navigate('/login')} className='bg-indigo-700 text-white px-4 py-2 rounded-full font-medium hidden md:block hover:bg-indigo-800 transition'>Create Account</button>
        )}
        {/* Mobile menu icon */}
        <img onClick={()=>setShowMenu(true)} className='w-7 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
      {showMenu && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowMenu(false)}></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-5 py-6 border-b border-indigo-100">
              <img className="w-32" src={assets.logo} alt="DocNow Logo" />
              <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <ul className="flex flex-col gap-2 mt-6 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-3 rounded hover:bg-indigo-50">HOME</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-3 rounded hover:bg-indigo-50">ALL DOCTORS</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-3 rounded hover:bg-indigo-50">ABOUT</p></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-3 rounded hover:bg-indigo-50">CONTACT</p></NavLink>
              {!token && (
                <button
                  onClick={() => { setShowMenu(false); navigate('/login') }}
                  className="bg-indigo-700 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-indigo-800 transition mt-4"
                >
                  Create Account
                </button>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar