import React, { useEffect, useState } from "react";
import { FaHeart, FaPen, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import Notiflix from "notiflix"; // Import Notiflix

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://blog-backend-8bex.onrender.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();

    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: token } : {};
  };

  const handleLike = async (postId) => {
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    try {
      const response = await fetch(
        `https://blog-backend-8bex.onrender.com/posts/${postId}/like`,
        {
          method: "POST",
          headers: { ...getAuthHeaders() },
        }
      );
      const data = await response.json();
      if (!data) {
        setPosts(
          posts.map((post) =>
            post._id === postId ? { ...post, likes: post.likes - 1 } : post
          )
        );
        Notiflix.Notify.failure("Failed to like the post.");
      } else {
        Notiflix.Notify.success("Post liked!");
      }
    } catch (error) {
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
      Notiflix.Notify.failure("Error liking the post.");
    }
  };

  const handleDelete = async (postId) => {
    const response = await fetch(
      `https://blog-backend-8bex.onrender.com/posts/${postId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );
    const data = await response.json();
    if (data) {
      setPosts(posts.filter((post) => post._id !== postId));
      Notiflix.Notify.success("Post deleted successfully!");
    } else {
      Notiflix.Notify.failure("Error deleting post.");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEdit = async () => {
    const updatedPost = { title: editTitle, content: editContent };
    try {
      const response = await fetch(
        `https://blog-backend-8bex.onrender.com/posts/${editingPost}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(updatedPost),
        }
      );
      const data = await response.json();
      if (data) {
        const fetchPosts = async () => {
          const response = await fetch(
            "https://blog-backend-8bex.onrender.com/posts"
          );
          const data = await response.json();
          setPosts(data);
        };
        fetchPosts();
        setEditingPost(null);
        Notiflix.Notify.success("Post updated successfully!");
      } else {
        Notiflix.Notify.failure("Failed to save changes.");
      }
    } catch (error) {
      Notiflix.Notify.failure("Error saving post.");
    }
  };

  const toggleReadMore = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null); // Collapse the post
    } else {
      setExpandedPost(postId); // Expand the post
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:scale-105 border border-gray-200 mt-5"
          >
            {editingPost === post._id ? (
              <div className="p-6">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {expandedPost === post._id
                    ? post.content
                    : post.content.substring(0, 100) + "..."}
                </p>
                <button
                  onClick={() => toggleReadMore(post._id)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  {expandedPost === post._id ? "Read Less" : "Read More"}
                </button>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500 text-sm">
                    {post.likes} Likes
                  </span>
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleLike(post._id)}
                    >
                      <FaHeart className="h-5 w-5" />
                    </button>
                    {isAdmin && (
                      <>
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          onClick={() => handleEdit(post)}
                        >
                          <FaPen className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(post._id)}
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-gray-400 text-sm">
                  {format(new Date(post.createdAt), "MMM dd, yyyy h:mm a")}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
