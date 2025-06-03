import React, { useEffect, useState } from 'react'
import axios from "axios"
function CreatorsHome() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get("https://blogapp-yt.onrender.com/blog/admin", {
          withCredentials: true,
        });
        console.log("getadmins data", data.admins);
        setAdmin(data.admins);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchAdmin();
  }, []);
  return (
    <>
      <div className=" container mx-auto p-6 cursor-pointer mb-4">
        <h1 className="text-2xl font-semibold mb-8 ">Popular Creators</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-full my-5 md:ml-4">
          {admin && admin.length > 0 ? (
            admin.slice(0, 4).map((element) => {
              return (
                <div key={element._id}>
                  <div className="">
                    <img
                      src={element.photo.url}
                      alt="blog"
                      className="md:w-56 md:h-56 object-cover border border-black rounded-full items-center "
                    />
                    <div className=" md:ml-[-130px]  text-justify mt-2">
                      <p className='text-center md:ml-10'>{element.name}</p>
                      <p className="text-red-900 font-semibold text-xs text-center md:ml-10">{element.role}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreatorsHome