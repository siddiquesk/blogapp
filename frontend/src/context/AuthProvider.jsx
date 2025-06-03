import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Creating context
export const AuthContext = createContext();

// ✅ Context provider component
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();                 // Stores all blogs
  const [profile, setProfile] = useState();             // Stores logged-in user's profile
  const [loading, setLoading] = useState(true);         // Controls loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state

  // ✅ Fetch user profile and blogs on component mount
  useEffect(() => {
    // 🔹 Fetch logged-in user's profile
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("https://blogapp-yt.onrender.com/blog/my-profile", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.log("Fetch Profile Error", error.response?.data || error.msg);
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };

    // 🔹 Fetch all blogs
    const fetchBlog = async () => {
      try {
        const response = await axios.get("https://blogapp-yt.onrender.com/blog/all-blogs");
        setBlogs(response.data.blogs);
      } catch (err) {
        console.log("Error fetching blogs:", err);
      }
    };

    fetchProfile();
    fetchBlog();
  }, []);

  // ✅ Providing context values to children components
  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
