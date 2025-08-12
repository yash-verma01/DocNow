import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext)

  const navigate=useNavigate()
  const Logout = () => {
    navigate('/')
    atoken&&localStorage.removeItem('atoken')
    atoken&&setAToken('')
  }

  return (
    <nav className="w-full bg-white shadow-md py-3 px-4 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
        <span className="text-lg font-semibold text-indigo-800">{atoken ? 'Admin' : 'Doctor'}</span>
      </div>
      <button
        onClick={() => Logout()}
        className="bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-indigo-800 transition"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar