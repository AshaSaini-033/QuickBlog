import React from 'react'
import { assets } from '../assets/assets'
const Fotter = () => {
  return (
    <div>
      <div className='flex flex-row justify-between gap-10 py-10 border-b border-gray-500 text-gray-500 items-start py-3 px-12 '>
        <div  className='flex-1'>
            
                <img  className='w-34'src={assets.logo } />
                <p className='text-xs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem odio, reprehenderit corrupti temporibus amet reiciendis libero officia. Illum, voluptates? Nemo ratione iure quisquam voluptas. Repellat assumenda iure aspernatur voluptatum magnam!</p>
        </div>
        <div  className='flex-1'>
          <h1 className='text-black font-semibold text-s mb-2'>Quick Links</h1>
          <ul className='text-gray-600 text-xs '>
            <li><a  className='hover:underline'href='#'> Home</a></li>
            <li><a className='hover:underline' href='#'> Best Seller</a></li>
            <li> <a  className='hover:underline'href='#'> Offers & Deals</a></li>
            <li>Contact Us</li>
            <li>FAQ's</li>
          </ul>
        </div>
        <div  className='flex-1'>
        <h1 className='text-black font-semibold text-s mb-2'>Need Help?</h1>
        <ul className='text-gray-600 text-xs'>
        <li>Delivery Information</li>
        <li>Return & Refund Policy</li>
        <li>Payment Methods</li>
        <li>Track your Order</li>
        <li>Contact Us</li>
        </ul>
        </div>
        <div  className='flex-1'>
            <h1 className='text-black font-semibold text-s mb-2'>Follow Us</h1>
            <ul className='text-gray-600 text-xs'>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>YouTube</li>
            </ul>
        </div>
      </div>
      <hr/>
     
    <p className='text-center py-4 text-sm md:text-base text-gray-500/80'>Copyright 2025 © QuickBlog GreatStack - All Right Reserved.</p>
     
    </div>
  )
}

export default Fotter
