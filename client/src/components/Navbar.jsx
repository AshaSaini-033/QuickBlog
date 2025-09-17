import React from 'react'
import {assets} from '../assets/assets'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img className='w-32 sm:w-44' src ={assets.logo} alt ='logo'/>
      <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-pink px-10 py-2.5'>Login
        <img src ={assets.arrow} alt ='arrow'/>
      </button>
      
    </div>
  )
}

export default Navbar
