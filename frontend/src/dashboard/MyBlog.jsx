import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlog() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://sufiyanblogapp.onrender.com/api/blog/my-blog",
          { withCredentials: true }
        );
        console.log(data.blogs);
        setMyBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);


  const handleDelete = async (id) => {
    await axios
      .delete(`https://sufiyanblogapp.onrender.com/api/blog/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.msg || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <>
      <div className="md:ml-72">
        <div className="container mx-auto my-12 p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {myBlogs && myBlogs.length > 0 ? (
              myBlogs.map((element) => (
                <div
                  key={element._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden w-full h-[350px] flex flex-col"
                >
                  {element?.blogImage && (
                    <img
                      src={element?.blogImage.url}
                      alt="blogImg"
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-sm text-gray-600">
                        {element.category}
                      </span>
                      <h4 className="text-lg font-semibold my-2 line-clamp-2">
                        {element.title}
                      </h4>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/blog/update/${element._id}`}
                        className="text-blue-500 bg-white rounded-md shadow px-3 py-1 border border-gray-300 hover:underline"
                      >
                        UPDATE
                      </Link>
                      <button
                        onClick={() => handleDelete(element._id)}
                        className="text-red-500 bg-white rounded-md shadow px-3 py-1 border border-gray-300 hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have not posted any blog to see!
              </p>
            )}
          </div>
        </div>
      </div>



    </>
  )
}

export default MyBlog
