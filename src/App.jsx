import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import MyAppointment from './pages/MyAppointment'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[1%]'>
      <Navbar></Navbar>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/doctors' element={<Doctors></Doctors>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors></Doctors>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/my-appointment' element={<MyAppointment></MyAppointment>}></Route>
        <Route path='/appointment/:docId' element={<Appointment></Appointment>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
