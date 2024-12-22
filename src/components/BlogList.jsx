import React from "react";

const BlogList = ({ blogs }) => (
  <div>
    {blogs.map((blog) => (
      <div key={blog._id} className="p-4 mb-4 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p className="text-gray-700">{blog.content}</p>
        <p className="text-sm text-gray-500">Likes: {blog.likes}</p>
      </div>
    ))}
  </div>
);

export default BlogList;
