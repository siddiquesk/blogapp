import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-300"
        >
          <FaArrowLeft />
          Go Back Home
        </Link>
      </div>
    </>
  )
}

export default NotFound
