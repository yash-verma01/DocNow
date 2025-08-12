import React, { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { backendUrl, setAToken } = useContext(AdminContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
                if (data.success) {
                    localStorage.setItem('atoken', data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {

            }
        } catch (error) {
            console.error('Login failed:', error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white rounded-2xl shadow-2xl border border-indigo-100">
                <p className="text-3xl font-extrabold m-auto mb-2 text-indigo-900">
                    <span className="text-indigo-700">{state}</span> Login
                </p>
                <div className="w-full">
                    <p className="mb-1 text-gray-700 font-medium">Email</p>
                    <input onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-indigo-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="w-full">
                    <p className="mb-1 text-gray-700 font-medium">Password</p>
                    <input onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-indigo-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-700 text-white w-full py-2 rounded-full text-base font-semibold shadow hover:bg-indigo-800 transition"
                >
                    Login
                </button>
                <div className="w-full text-center mt-2 text-sm text-gray-700">
                    {state === 'Admin' ? (
                        <p>
                            Doctor Login?{' '}
                            <span
                                onClick={() => setState('Doctor')}
                                className="text-indigo-700 font-semibold cursor-pointer hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Admin Login?{' '}
                            <span
                                onClick={() => setState('Admin')}
                                className="text-indigo-700 font-semibold cursor-pointer hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Login
