import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const {axios,navigate,setToken} = useAppContext();

    const logout = ()=>{
      localStorage.removeItem('token')
      axios.default.headers.common['Authorization' ] = null;
      setToken(null)
   navigate('/')
    }
  return (
   <>
   {/* navbar of admin page */}
   <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
    <img className='w-32 sm:w-40 cursor-pointer' onClick={()=>navigate('/')} src= {assets.logo}/>
     <button className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer' onClick={logout}>Logout</button>
   </div>
   <div className=' flex h-[calc(100vh-70px)]'>
   <Sidebar/>
   <Outlet/>
   </div>
   </>
  )
}

export default Layout
