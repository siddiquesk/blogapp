import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // 🔹 Extracting blog ID from URL params
  const [blogs, setblogs] = useState({}); // 🔹 State to hold blog data

  // 🔹 Fetch blog by ID on component mount
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/blog/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setblogs(data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);

  return (
    <>
      <div>
        <div>
          {blogs && (
            <section className="max-w-6xl mx-auto p-4 md:p-10 lg:p-16">
              {/* 🔹 Category */}
              <div className="text-blue-500 uppercase text-xs font-bold mb-4">
                {blogs?.category}
              </div>

              {/* 🔹 Blog Title */}
              <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>

              {/* 🔹 Author Info */}
              <div className="flex items-center mb-8">
                <img
                  src={blogs?.adminPhoto}
                  alt="author_avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-lg font-semibold">{blogs?.adminName}</p>
              </div>

              {/* 🔹 Blog Content */}
              <div className="flex flex-col md:flex-row gap-10">
                {blogs?.blogImage && (
                  <img
                    src={blogs?.blogImage?.url}
                    alt="mainblogsImg"
                    className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border object-cover"
                  />
                )}
                <div className="md:w-1/2 w-full">
                  <p className="text-lg leading-8 text-gray-700">{blogs?.about}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default Detail;

