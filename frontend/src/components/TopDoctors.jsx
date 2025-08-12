import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className="flex flex-col items-center py-16 px-4 bg-gradient-to-br from-blue-100 via-indigo-200 to-indigo-400 rounded-3xl shadow-2xl mb-14 transition-all duration-300">
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-2 text-center tracking-tight">
        Top Doctors to Book
      </h1>
      <p className="text-lg md:text-xl text-gray-800 text-center mb-8 max-w-2xl font-medium opacity-95">
        Simply browse through our extensive list of trusted doctors and book your appointment with ease.
      </p>
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-w-max justify-center pb-2">
          {doctors.slice(0, 8).map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="flex flex-col bg-white rounded-xl shadow-md border border-blue-100 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl min-w-[220px] max-w-xs mx-auto"
            >
              <img className="w-full h-40 object-cover rounded-t-xl bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available</span>
                </div>
                <p className="text-gray-900 text-lg font-semibold text-center">{item.name}</p>
                <p className="text-indigo-700 text-sm font-medium text-center">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate(`/doctors`)}
        className="bg-indigo-700 text-white font-semibold px-10 py-3 rounded-full mt-10 shadow hover:bg-indigo-800 transition duration-200"
      >
        View All Doctors
      </button>
    </section>
  )
}

export default TopDoctors
