import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        'https://sufiyanblogapp.onrender.com/api/user/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (status === 200 || status === 201) {
        toast.success(data.msg || 'Login successful');
        // ✅ Set authentication state in context
        setProfile(data.user);
        setIsAuthenticated(true);
        // Reset form fields
        setUser({ email: '', password: '', role: '' });
        // Navigate to home
        navigate('/');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      const errorMsg = err.response?.data?.msg || err.response?.data || 'Login failed';
      toast.error(typeof errorMsg === 'string' ? errorMsg : 'Login failed');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Brand Logo */}
          <div className="font-semibold text-xl text-center mb-2">
            Cilli<span className="text-blue-500">Blog</span>
          </div>

          {/* Heading */}
          <h1 className="font-semibold text-xl text-center mb-4">Login Here</h1>

          {/* Role Selector */}
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded-md outline-none hover:border-indigo-700"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md hover:border-indigo-700 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md hover:border-indigo-700 outline-none"
              required
            />
          </div>

          {/* Link to Register */}
          <p className="text-center mb-4">
            New User?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 transition text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
