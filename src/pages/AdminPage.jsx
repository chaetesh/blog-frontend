import React, { useState, useEffect } from "react";
import BlogPostForm from "../components/BlogPostForm";
import LoginForm from "../components/LoginForm";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      {isLoggedIn ? (
        <BlogPostForm />
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default AdminPage;
