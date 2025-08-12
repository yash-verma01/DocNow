import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorLists = () => {
  const { doctors, getAllDoctors, atoken, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getAllDoctors()
    } else {
      console.error("No admin token found")
    }
  }, [atoken])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6 text-center">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors && doctors.length > 0 ? doctors.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-indigo-200 mb-4"
            />
            <div className="w-full text-center">
              <p className="text-lg font-semibold text-indigo-900">{item.name}</p>
              <p className="text-indigo-700 mb-2">{item.speciality}</p>
              <div className="flex items-center justify-center gap-2 mt-2 cursor-pointer select-none">
                <input
                  
                  type="checkbox"    
                  checked={item.available}     
                  onChange={() => changeAvailability(item._id)}         
                  className="accent-indigo-700"
                />
                <span className={`font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-500">No doctors found.</div>
        )}
      </div>
    </div>
  )
}

export default DoctorLists
