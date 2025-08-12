import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets_frontend/assets'

const SpecialityIcon = () => (
  <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
  </svg>
)

const Speciality = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center py-16 px-4 bg-gradient-to-br from-blue-100 via-indigo-200 to-indigo-400 rounded-3xl shadow-2xl mb-14 transition-all duration-300"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-2 text-center tracking-tight">
        Find by Speciality
      </h2>
      <p className="text-lg md:text-xl text-gray-800 text-center mb-8 max-w-2xl font-medium opacity-95">
        Browse our trusted doctors by speciality and book your appointment with ease.
      </p>
      <div className="w-full overflow-x-auto">
        <div className="flex flex-row gap-8 min-w-max justify-center pb-2">
          {specialityData.map((item, idx) => (
            <Link
              to={`/doctors/${item.speciality}`}
              key={idx}
              onClick={() => scrollTo(0, 0)}
              className="flex flex-col items-center bg-white rounded-xl shadow-md px-8 py-8 min-w-[170px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <SpecialityIcon />
              <span className="mt-4 text-base font-semibold text-indigo-700">{item.speciality}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Speciality
