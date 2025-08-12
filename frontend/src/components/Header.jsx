import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-indigo-400 rounded-3xl px-6 py-24 md:py-32 shadow-2xl mb-14 transition-all duration-300">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 text-center mb-5 tracking-tight leading-tight drop-shadow-lg">
        Seamless Healthcare Booking
      </h1>
      <p className="text-lg md:text-2xl text-gray-800 text-center max-w-2xl mb-10 font-medium opacity-95">
        Instantly find trusted doctors and schedule your appointments.<br />
        Experience a new era of healthcare convenience with <span className="font-semibold text-indigo-700">DocNow</span>.
      </p>
      <a
        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white font-bold px-12 py-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
        href="#speciality"
      >
        Book Appointment
        <img src={assets.arrow_icon} alt="arrow" className="w-6 h-6" />
      </a>
    </header>
  )
}

export default Header
