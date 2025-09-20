import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import {motion} from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
const BlogList = () => {
    const [menu, setMenu] = useState('All')
    //display blogData from db
    const {blogs,input} = useAppContext()
    const filteredBlogs= ()=>{
      if(input ===''){
        return blogs;
      }
      console.log("blogs from context:", blogs);

      return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

return (
  <div>
    <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
      {blogCategories.map((item) => (
        <div key={item} className="relative">
          <button
            onClick={() => setMenu(item)}
            className={`relative cursor-pointer px-4 pt-0.5 rounded-full ${
              menu === item ? 'text-white' : 'text-gray-600'
            }`}
          >
            {/* text always above background */}
            <span className="relative z-10">{item}</span>

            {/* background only if selected */}
            {menu === item && (
              <motion.div layoutId='underline'
              transition={{type:'spring' ,stiffness:500 ,damping:30}} className="absolute inset-0 h-7 bg-primary rounded-full z-0"></motion.div>
            )}
          </button>
        </div>
      ))}
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 sm:mx-16 xl:mx-40'>
      {filteredBlogs().filter((blog)=>menu==='All' ?true :blog.category===menu).map((blog)=><BlogCard key={blog._id} blog={blog}/>)}
    </div>
  </div>
)

}

export default BlogList
