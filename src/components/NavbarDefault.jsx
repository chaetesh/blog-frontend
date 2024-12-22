import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/admin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className=" font-semibold text-xl">Blog App</div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className=" hover:text-blue-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className=" hover:text-green-500 transition-colors duration-300"
          >
            Create Blog (Admin)
          </Link>

          {/* Show the logout button only if the user is logged in */}
          {token && (
            <button
              onClick={handleLogout}
              className=" hover:text-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className=""
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (hidden on desktop) */}
      <div
        className={`md:hidden flex justify-center space-y-4 py-4 transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link
          to="/"
          className=" hover:text-blue-300 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/admin"
          className=" hover:text-blue-300 transition-colors duration-300"
        >
          Admin
        </Link>

        {/* Show the logout button only if the user is logged in */}
        {token && (
          <button
            onClick={handleLogout}
            className=" hover:text-blue-300 transition-colors duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
