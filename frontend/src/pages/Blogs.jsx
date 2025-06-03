import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
function Blogs() {
  const { blogs } = useAuth();
  return (
    <>
      <div className="container mx-auto p-4 mb-6">
        <h1 className="text-2xl font-bold mb-4 md:p-4">All Blogs goes here!!!</h1>
        <p className="text-center mb-10">
          The concept of gods varies widely across different cultures,
          religions, and belief systems
        </p>
        <div className=" container mx-auto my-2 pb-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((element) => {
              return (
                <Link
                  to={`/blog/${element._id}`}
                  key={element._id}
                  className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >

                  <div className="group relative ">
                    <img
                      src={element.blogImage.url}
                      alt=""
                      className="w-full h-56 object-cover"
                    />
                    <div className=" absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                    <h1 className=" absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                      {element.title}
                    </h1>
                  </div>
                  <div className="p-6 flex items-center">
                    <img
                      src={element.
                        adminPhoto
                      }
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {element.adminName}
                      </p>
                      <p className="text-xs text-gray-400">New</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className=" flex h-screen items-center justify-center">
              Loading....
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Blogs
