import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import {motion} from 'motion/react'
const BlogList = () => {
    const [menu, setMenu] = useState('All')

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
  </div>
)

}

export default BlogList
