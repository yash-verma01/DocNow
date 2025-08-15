// import React, { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { DoctorContext } from '../context/DoctorContext'

// const Navbar = () => {
//   const { atoken, setAToken } = useContext(AdminContext)
//   const { dtoken, setDToken } = useContext(DoctorContext)

//   const navigate = useNavigate()

//   const Logout = () => {
//     navigate('/')
//     atoken && localStorage.removeItem('atoken')
//     dtoken && localStorage.removeItem('dtoken')
//     dtoken && setDToken('')
//     atoken && setAToken('')
//   }

//   return (
//     <nav className="w-full bg-white shadow-md py-3 px-4 md:px-10 flex items-center justify-between gap-3 flex-wrap">
//       {/* Left: Logo + Name */}
//       <div className="flex items-center gap-3 min-w-0">
//         <img
//           src={assets.logo}
//           alt="Logo"
//           className="h-10 w-auto flex-shrink-0"
//         />
//         <span className="text-lg font-semibold text-indigo-800 truncate max-w-[100px] sm:max-w-[150px]">
//           {atoken ? 'Admin' : 'Doctor'}
//         </span>
//       </div>

//       {/* Right: Logout Button */}
//       <button
//         onClick={Logout}
//         className="bg-indigo-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-indigo-800 transition flex-shrink-0 text-sm sm:text-base"
//       >
//         Logout
//       </button>
//     </nav>
//   )
// }

// export default Navbar



import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext)
  const { dtoken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const Logout = () => {
    navigate('/')
    atoken && localStorage.removeItem('atoken')
    dtoken && localStorage.removeItem('dtoken')
    dtoken && setDToken('')
    atoken && setAToken('')
  }

  return (
    <nav className="w-full bg-white shadow-md py-3 px-4 md:px-10 flex items-center justify-between gap-3 flex-nowrap">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto flex-shrink-0"
        />
        <span className="text-lg font-semibold text-indigo-800 truncate min-w-0 max-w-[100px] sm:max-w-[150px]">
          {atoken ? 'Admin' : 'Doctor'}
        </span>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={Logout}
        className="bg-indigo-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-indigo-800 transition flex-shrink-0 text-sm sm:text-base"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
