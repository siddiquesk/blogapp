import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function SideBar({ component, setComponent }) {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth(); // 🔹 Auth context data
  const navigate = useNavigate(); // 🔹 React Router navigation
  const [show, setShow] = useState(false); // 🔹 Mobile sidebar toggle state

  // 🔹 Sidebar button component switch handler
  const handleComponents = (value) => {
    setComponent(value);
  };

  // 🔹 Navigate to home page
  const GotoHome = () => {
    navigate("/");
  };

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://blogapp-yt.onrender.com/user/logout",
        { withCredentials: true }
      );
      toast.success(data.msg);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.msg || "Failed to logout");
    }
  };

  return (
    <>
      {/* 🔹 Mobile menu button */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <IoMenu className="text-3xl" />
      </div>

      {/* 🔹 Sidebar container */}
      <div
        className={`w-64 md:w-[20vw] h-full shadow-lg py-8 fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* 🔹 Mobile back arrow to close sidebar */}
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </div>

        {/* 🔹 Profile info */}
        <div className="text-center mt-4">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2"
            src={profile?.photo?.url}
            alt=""
          />
          <p className="text-lg font-semibold mb-2">{profile?.name}</p>
        </div>

        {/* 🔹 Sidebar buttons */}
        <ul className="space-y-6 mx-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            MY PROFILE
          </button>
          <button
            onClick={GotoHome}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
