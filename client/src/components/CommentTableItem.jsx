import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment,fetchComments}) => {
    const {blog,createdAt,_id} = comment;
    const {axios} = useAppContext();
    const BlogDate = new Date(createdAt);

    const handleApprove = async () => {
        const token = localStorage.getItem("token");
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id: _id}, {
                headers: { Authorization: `${token}` }
            });
            if(data.success){
                toast.success("Comment approved");
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if(window.confirm("Are you sure you want to delete this comment?")){
            try {
                const {data} = await axios.post('/api/admin/delete-comment', {id: _id}, {
                    headers: { Authorization: `${token}` }
                });
                if(data.success){
                    toast.success("Comment deleted");
                    fetchComments();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

  return (
    <tr className='border-y border-gray-300' >
    <td className='px-6 py-4'>
  <b className='text-gray-600 font-medium'>Blog</b> : 
  {blog?.title || <span className='text-red-500 font-semibold'>[Blog has been deleted]</span>}
  <br/>
  <b className='text-gray-600 font-medium'>Name</b> : {comment.name}
  <br/>
  <b className='text-gray-600 font-medium'>Comments</b> : {comment.content}
</td>
     <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
     </td>
     <td className='px-6 py-4'>
        <div className='inline-flex item-center gap-4'>
            {!comment.isApproved?
            <img onClick={handleApprove} src = {assets.tick_icon} alt="Approve" className='w-5 hover:scale-110 transition-all cursor-pointer'/>:
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
            <img onClick={handleDelete} src = {assets.bin_icon} alt="Delete" className='w-5 hover:scale-110 transition-all cursor-pointer'/>
        </div>
     </td>

    </tr>
  )
}

export default CommentTableItem
