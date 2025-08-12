import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
    <div className=' text-center text-2xl pt-10 text-gray-500 '>
      <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
    </div>   
    <div className='flex flex-col justify-center md:flex-row gap-10 mb-20 text-sm my-10'>
      <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
        <p className='text-gray-500'>529GHA/146 <br/>Purani Basti Kalyanpur</p>
        <p className='text-gray-500'>73525XXXXX <br/>yashxxxx77@gmail.com</p>
        <p className='font-semibold text-lg text-gray-700'>Career at DocNow</p>
        <p className='text-gray-500'>Learn more about our team and DocNow</p>
        <button className='border border-black px-3 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer '>Explore Jobs</button>
      </div>
    </div>
    </div>
    
  )
}

export default Contact
