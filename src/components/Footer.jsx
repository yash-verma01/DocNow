import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <footer className="bg-white rounded-t-3xl shadow-2xl mx-0 md:mx-10 mt-40 mb-0 px-6 py-12 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20 mb-8">
        <div className="flex-1">
          <img className="mb-5 w-40" src={assets.logo} alt="DocNow Logo" />
          <p className="text-gray-700 max-w-md leading-6 font-medium">
            DocNow brings you seamless healthcare booking, connecting patients and trusted doctors with ease and security.
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold mb-4 text-indigo-900">Company</p>
          <ul className="flex flex-col gap-2 text-gray-700 font-medium">
            <li className="hover:text-indigo-700 cursor-pointer transition">Home</li>
            <li className="hover:text-indigo-700 cursor-pointer transition">About Us</li>
            <li className="hover:text-indigo-700 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-indigo-700 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-lg font-semibold mb-4 text-indigo-900">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-700 font-medium">
            <li className="hover:text-indigo-700 transition">7355xxxxxx</li>
            <li className="hover:text-indigo-700 transition">yashxxxx77@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="border-indigo-200" />
      <p className="py-5 text-sm text-center text-gray-600">
        &copy; 2025 <span className="font-semibold text-indigo-700">DocNow</span> — All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer
