import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false); // Mobile menu toggle
  const { isAuthenticated, profile, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://sufiyanblogapp.onrender.com/api/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      toast.success(data.msg);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-lg px-4 md:px-0 py-4">
      <div className="flex justify-between items-center md:container md:mx-auto md:px-[4rem]">

        {/* Logo Section */}
        <div className="font-semibold text-xl cursor-pointer">
          Cilli<span className="text-blue-500">Blog</span>
        </div>

        {/* Desktop Menu Links */}
        <ul className="space-x-6 hidden md:flex">
          <Link to="/" className="uppercase hover:text-blue-600 duration-300">Home</Link>
          <Link to="/blogs" className="uppercase hover:text-blue-600 duration-300">Blogs</Link>
          <Link to="/creator" className="uppercase hover:text-blue-600 duration-300">Creators</Link>
          <Link to="/about" className="uppercase hover:text-blue-600 duration-300">About</Link>
          <Link to="/contact" className="uppercase hover:text-blue-600 duration-300">Contact</Link>
        </ul>

        {/* Admin Dashboard Button */}
        {isAuthenticated && profile?.role === "admin" && (
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded hidden md:block"
          >
            DASHBOARD
          </Link>
        )}


        {!isAuthenticated ? (
          <Link
            to="/login"
            className="bg-red-600 md:mr-8 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded hidden md:block"
          >
            LOGIN
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded hidden md:block"
          >
            LOGOUT
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <IoClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMenu && (
        <div className="bg-white md:hidden">
          <ul className="flex flex-col h-screen justify-center items-center space-y-6 text-xl">
            <Link to="/" onClick={() => setShowMenu(false)} className="uppercase hover:text-blue-600 duration-300">Home</Link>
            <Link to="/blogs" onClick={() => setShowMenu(false)} className="uppercase hover:text-blue-600 duration-300">Blogs</Link>
            <Link to="/creator" onClick={() => setShowMenu(false)} className="uppercase hover:text-blue-600 duration-300">Creators</Link>
            <Link to="/about" onClick={() => setShowMenu(false)} className="uppercase hover:text-blue-600 duration-300">About</Link>
            <Link to="/contact" onClick={() => setShowMenu(false)} className="uppercase hover:text-blue-600 duration-300">Contact</Link>

            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={() => setShowMenu(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              >
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setShowMenu(false)}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setShowMenu(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
              >
                LOGOUT
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


