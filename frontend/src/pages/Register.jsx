import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  // State to hold form input values (text fields)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    education: '',
  });

  // State to hold selected photo file and its preview URL (base64)
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  // React Router hook to navigate programmatically after registration
  const navigate = useNavigate();

  // Handle changes for text inputs and select fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle photo input and create a preview for UI display
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];  // Get selected file from input
    if (file) {
      setPhoto(file);  // Store file in state for backend upload

      // Create FileReader to generate base64 preview for instant UI feedback
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);  // Set preview image as base64 string
      };
      reader.readAsDataURL(file);  // Convert file to base64 format
    }
  };

  // Form submission handler for user registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for multipart/form-data submission
    const formData = new FormData();
    /*
      FormData allows appending both text fields and files
      to send multipart/form-data requests which backend can parse easily.
    */
    for (let key in form) {
      formData.append(key, form[key]); // Append each text field to FormData
    }

    if (photo) {
      formData.append('photo', photo); // Append selected photo file if available
    }

    try {
      // Make POST request to backend API with formData
      const response = await axios.post(
        'http://localhost:8000/api/user/register',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      // On success, show success toast, reset form and navigate to login page
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.msg);
        setProfile(response.data.user);
        setIsAuthenticated(true)
        setForm({
          name: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          education: '',
        });
        setPhoto(null);
        setPhotoPreview('');
        navigate('/');
      }
    } catch (err) {
      // Handle errors and show error toast
      console.error(err.response?.data || err.msg);
      toast.error(err.response?.msg || 'Registration failed');
    }
  };

  /*
    Photo preview is shown immediately on UI so user can confirm
    before submitting the form, similar to profile photo previews on social apps.
  */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          {/* Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Name Input */}
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Email Input */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Phone Input */}
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Password Input */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Education Selection */}
          <select
            name="education"
            value={form.education}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
          </select>

          {/* Photo Upload & Preview */}
          <div className="mb-4 flex items-center">
            <div className="w-16 h-16 bg-gray-200 mr-4 rounded overflow-hidden">
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

          {/* Redirect to Login */}
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;



