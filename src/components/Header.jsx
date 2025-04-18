import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      <div className=' flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className=' text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointments <br></br> with DocNow</p>
        <div className='flex-col items-center md:flex-row text-white text-sm font-bold'>
            <img className='w-38'src={assets.group_profiles} alt=''></img>
            <p>Simply browse through our extensive list of trusted doctors</p>
        </div>
        <a className='flex items-center gap-2 bg-white px-5 py-5 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transi duration-300' 
        href="#speciality">
        Book Appointments <img src={assets.arrow_icon} alt=''></img></a>
      </div>

      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg'src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
