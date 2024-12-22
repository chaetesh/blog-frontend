import React, { useState } from "react";
import axios from "axios";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://blog-backend-8bex.onrender.com/posts",
        { title, content, imageUrl },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => alert("Post created"))
      .catch((err) => alert("Failed to create post"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Post
      </button>
    </form>
  );
};

export default BlogPostForm;
