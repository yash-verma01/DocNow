import React from 'react'
import Login from './pages/login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointment from './pages/Admin/AllAppointment.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorLists from './pages/Admin/DoctorLists.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';


const App = () => {
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)

  return atoken || dtoken? (
    <div >
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/all-appointments' element={<AllAppointment></AllAppointment>}></Route>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
          <Route path='/doctor-list' element={<DoctorLists></DoctorLists>}></Route>
          {/* //doctorroutes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointments></DoctorAppointments>}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile></DoctorProfile>}></Route>
        </Routes>

      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App
