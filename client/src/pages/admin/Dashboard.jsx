import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTable from '../../components/admin/BlogTable';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [dashboardData,setDashboardData] =useState({
        blogs:0,
        comments:0,
        drafts:0,
        recentBlogs:[]
    });
    const { axios } = useAppContext();

    const fetchDashboard = async()=>{
        try {
            const { data } = await axios.get('/api/admin/dashboard');
            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        fetchDashboard()
    },[])
  return (
    <div className='flex-1 bg-blue-50/50 p-4 md:p-10'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src = {assets.dashboard_icon_1}/>
            <div >
               <p className='text-xl font-semibold text-gray-600 '>{dashboardData.blogs || 0}</p>
               <p className='text-gray-400 font-light'>Blogs</p>
            </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src = {assets.dashboard_icon_2}/>
            <div >
               <p className='text-xl font-semibold text-gray-600 '>{dashboardData.comments || 0}</p>
               <p className='text-gray-400 font-light'>Comments</p>
            </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src = {assets.dashboard_icon_3}/>
            <div >
               <p className='text-xl font-semibold text-gray-600 '>{dashboardData.drafts || 0}</p>
               <p className='text-gray-400 font-light'>Drafts</p>
            </div>
        </div>
      </div>
      <div  className='flex items-center gap-3 m-4 mt-6 text-gray-600' >
        <img src = {assets.dashboard_icon_4}/>
        <p>Latest Blogs</p>
      </div>
      {/* tables */}
      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500 '>
            <thead className='text-xs text-gray-600 text-left uppercase'>
                <tr>
                    <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                     <th scope='col' className='px-2 py-4'>Blog Title</th>
                      <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                       <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                        <th scope='col' className='px-2 py-4'>Action</th>
                </tr>
            </thead>
            <tbody>
                {dashboardData.recentBlogs.map((blog,index)=>{
                   return <BlogTable key ={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1} />
                })}
            </tbody>
        </table>
      </div>
    </div>

  )
}

export default Dashboard
