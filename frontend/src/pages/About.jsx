import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[300px] ' src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center items-center md:items-start md:w-2/3 text-gray-600 gap-6">
        <p>Lorem, Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora facere quam expedita dolorum omnis, adipisci sapiente provident dicta sed, reiciendis, enim vero eaque?ipsum dolor sit amet consectetur adipisicing elit. Architecto excepturi est voluptatum?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse quidem accusamus, suscipit facere possimus ab. Nisi eligendi iusto quidem debitis quasi officiis!</p>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ab eveniet tempore sunt incidunt blanditiis fuga natus cupiditate aut reprehenderit?</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-12'>
        <div className='cursor-pointer text-gray-600 transition-all duration-300 hover:text-white hover:bg-primary text-[15px] gap-5 flex flex-col sm:py-16 py-8 md:px-16 px-10 border'>
          <b>Efficiency</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quibusdam consequuntur.</p>
        </div>
        <div className='cursor-pointer text-gray-600 transition-all duration-300 hover:text-white hover:bg-primary text-[15px] gap-5 flex flex-col sm:py-16 py-8 md:px-16 px-10 border'>
          <b>Convenience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem soluta et impedit!</p>
        </div>
        <div className='cursor-pointer text-gray-600 transition-all duration-300 hover:text-white hover:bg-primary text-[15px] gap-5 flex flex-col sm:py-16 py-8 md:px-16 px-10 border'>
          <b>Personalization</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum numquam nisi quos.</p>
        </div>
      </div>
    </div>
  )
}

export default About
