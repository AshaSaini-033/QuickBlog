import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTable = ({blog,fetchBlogs,index}) => {
    const {title,createdAt, _id} = blog;
    const {axios} = useAppContext();
    const BlogDate = new Date(createdAt);

    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete this blog?")){
            try {
                const {data} = await axios.post('/api/blog/delete', {id: _id});
                if(data.success){
                    toast.success("Blog deleted successfully");
                    fetchBlogs();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const handlePublish = async () => {
        try {
            const {data} = await axios.post('/api/blog/toggle-publish', {id: _id});
            if(data.success){
                toast.success("Blog status updated");
                fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
         <td className='px-2 py-4'>{title}</td>
         <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
         <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ?'text-green-600':'text-orange-700'}`}>{blog.isPublished ?'Published':'Unpublished'} </p>
         </td>
         <td className='px-2 py-4 flex text-xs gap-3'>
          <button onClick={handlePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ?'Unpublish':'Publish'} </button>
          <img onClick={handleDelete} className='w-8 hover:scale-110 tarnsition-all cursor-pointer' src={assets.cross_icon} alt="Delete" />
         </td>
    </tr>
  )
}

export default BlogTable
