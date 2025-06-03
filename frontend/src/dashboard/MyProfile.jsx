import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth(); // ✅ Get logged-in user profile from context

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-0 my-10 md:my-0">
        <div className="bg-white shadow-none md:shadow-lg rounded-lg overflow-hidden w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%]">

          {/* 🔹 Cover Image Section */}
          <div>
            <img
              src={profile?.photo?.url}
              alt="cover"
              className="w-full h-48 md:h-80 object-cover"
            />

            {/* 🔹 Profile Picture on top of cover image */}
            <div className="absolute inset-x-0 bottom-[250px] md:bottom-[260px] transform translate-y-1/2 z-10">
              <img
                src={profile?.photo?.url}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700 bg-white"
              />
            </div>
          </div>

          {/* 🔹 Profile Details Section */}
          <div className="px-4 sm:px-6 py-12 mt-2 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile?.name}
            </h2>
            <p className="text-gray-600 mt-2">{profile?.email}</p>
            <p className="text-gray-600 mt-1">{profile?.phone}</p>
            <p className="text-gray-600 mt-1 capitalize">{profile?.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;

