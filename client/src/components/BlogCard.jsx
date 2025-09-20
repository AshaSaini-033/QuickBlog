import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  // Ensure description is a string before calling substring to prevent errors.
  const descriptionSnippet = (blog.description || '').substring(0, 100) + '...';

  return (
    <Link to={`/blog/${blog._id}`} className="block relative z-20">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full bg-white">
        {/* Card content */}
        <img src={blog.image} alt={blog.title || 'Blog post image'} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-500">{blog.category || 'Uncategorized'}</p>
          <h3 className="text-lg font-semibold my-2">{blog.title || 'Untitled Blog'}</h3>
          {/* You might want to add a snippet of the description */}
          <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: descriptionSnippet }}></div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;