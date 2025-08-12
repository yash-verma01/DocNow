import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Speciality from '../components/speciality'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <div>
      <Header></Header>
      <Speciality></Speciality>
      <TopDoctors></TopDoctors>
      <Banner></Banner>
      
    </div>
  )
}

export default Home
