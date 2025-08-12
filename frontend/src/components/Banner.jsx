import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-indigo-400 rounded-3xl shadow-2xl px-8 py-16 md:py-24 mb-14 transition-all duration-300">
      <h2 className="text-3xl md:text-5xl font-extrabold text-indigo-900 mb-4 text-center leading-tight">
        Book Appointments Effortlessly
      </h2>
      <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl text-center font-medium opacity-95">
        Join 50+ trusted doctors and thousands of patients experiencing seamless healthcare booking with <span className="font-semibold text-indigo-700">DocNow</span>.
      </p>
      <button
        onClick={() => { navigate('/login'); scrollTo(0, 0) }}
        className="bg-indigo-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-800 transition duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Create Account
      </button>
    </section>
  )
}

export default Banner
