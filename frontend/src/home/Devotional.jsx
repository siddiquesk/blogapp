import React from 'react';
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");
  console.log(devotionalBlogs);

  return (
    <div className='px-4'>
      <div className="max-w-screen-xl mx-auto my-6 p-4">
        <h1 className="text-3xl font-bold text-left mb-4">Devotion</h1>
        <p className="text-center text-gray-700 mb-8">
          The concept of devotion spans cultures, connecting hearts to the divine through faith, love, and prayer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center items-center col-span-full h-64 text-lg">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;

