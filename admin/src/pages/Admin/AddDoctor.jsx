import React, { useContext, useRef } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'

const AddDoctor = () => {
  const{backendUrl,atoken}=useContext(AdminContext)

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')



  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try  
    {
      if(!docImg)
      {
        return toast.error('Please upload a doctor picture')
      }
      const formData = new FormData()
      formData.append('image', docImg) 
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({line1: address1, line2: address2}))
      formData.append('about', about)

      formData.forEach((value, key) => {
        console.log(`${key}, ${value}`);
      });
      console.log(backendUrl+'/api/admin/add-doctor')
      const {data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          atoken: atoken,
        }
      })
      if(data.success)
      {
        toast.success('Doctor added successfully')
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('') 
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      }else
      {
        toast.error(data.message)
      }
        

    }
    catch (error) {
      console.error('Error uploading doctor picture:', error)
      return toast.error('Failed to upload doctor picture')
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Add Doctor</h2>

      {/* Upload Doctor Picture */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="doc-img" className="cursor-pointer flex flex-col items-center">
          <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" className="w-24 h-24 object-cover rounded-full border-2 border-indigo-200" />
          <span className="text-indigo-700 mt-2 font-medium">Upload Doctor Picture</span>
        </label>
        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Name */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Doctor Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
      </div>
        {/* Doctor Email */}
      <div>
          <label className="block mb-1 text-gray-700 font-medium">Doctor Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email}  type="email" placeholder="Email" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
      </div>
        {/* Doctor Password */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Doctor Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        {/* Experience */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Experience</label>
          <select required onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <option value="">Select Experience</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>
            ))}
          </select>
        </div>
        {/* Fees */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Fees</label>
          <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        {/* Speciality */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Speciality</label>
          <select required onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <option value="">Select Speciality</option>
            <option value="General physician">General Physician</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Education */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Education</label>
          <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        {/* Address */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Address</label>
          <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="border border-indigo-200 rounded w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
      </div>

      {/* About Doctor */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">About Doctor</label>
        <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="About Doctor" required className="border border-indigo-200 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[80px]" />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-700 text-white py-2 rounded-full font-semibold shadow hover:bg-indigo-800 transition"
      >
        Add Doctor
      </button>
    </form>
  )
}

export default AddDoctor
