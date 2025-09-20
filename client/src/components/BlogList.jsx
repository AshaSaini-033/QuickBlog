import React, { useState, useMemo } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'framer-motion'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    //display blogData from db
    const {blogs,input} = useAppContext()

    const filteredBlogs = useMemo(() => {
      if (!input) {
        return blogs;
      }
      return blogs.filter(
        (blog) => (blog.title && blog.title.toLowerCase().includes(input.toLowerCase())) ||
                  (blog.category && blog.category.toLowerCase().includes(input.toLowerCase()))
      );
    }, [blogs, input]);

    const blogsToDisplay = useMemo(() => {
        if (menu === 'All') {
            return filteredBlogs;
        }
        return filteredBlogs.filter(blog => blog.category === menu);
    }, [filteredBlogs, menu]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 sm:mx-16 xl:mx-40">
          {blogsToDisplay.length > 0 ? (
            blogsToDisplay.map((blog) => {
              if (!blog || !blog._id) {
                console.warn("Invalid blog data:", blog);
                return null; // Skip rendering invalid blogs
              }
              return <BlogCard key={blog._id} blog={blog} />;
            })
          ) : (
            <p className="text-center col-span-3 text-gray-500">No blog posts found. Check the admin panel to publish blogs.</p>
          )}
        </div>
    
      </div>
    )

}

export default BlogList
