import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {
    const {title, description, category, image, _id, id, subTitle} = blog;
    const blogId = _id || id;
    const navigate = useNavigate();

    const handleNavigate = () => {
      if (blogId) {
        console.log("Navigating to", `/blog/${blogId}`);
        navigate(`/blog/${blogId}`);
      } else {
        console.error("Blog ID is missing, cannot navigate.", blog);
      }
    };

  return (
    <div onClick={handleNavigate} className='w-full rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-primary/25 duration-300 cursor-pointer group'>
      <img src={image} alt={title} className='w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'/>
      <div className='p-4'>
        <span className='inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2'>#{category}</span>
        <h5 className='mt-2 mb-2 font-bold text-xl text-gray-800 truncate'>{title}</h5>
        <p className='mb-3 text-base text-gray-700 truncate' dangerouslySetInnerHTML={{ "__html" : subTitle || description?.slice(0, 100) }}></p>
      </div>
    </div>
  )
}

export default BlogCard
