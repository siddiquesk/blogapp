import React, { useState } from 'react'
import SideBar from '../dashboard/SideBar';
import { useAuth } from '../context/AuthProvider';
import MyProfile from "../dashboard/MyProfile"
import CreateBlog from "../dashboard/CreateBlog"
import MyBlog from "../dashboard/MyBlog"
import { Navigate } from "react-router-dom"
import UpdateBlog from './../dashboard/UpdateBlog';
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log("dashboard ", profile);
  console.log("true bhai ", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />
  }
  return (
    <>
      <div>
        <div>
          <SideBar component={component} setComponent={setComponent} />
          {component === "My Profile" ? (
            <MyProfile />
          ) : component === "Create Blog" ? (
            <CreateBlog />
          ) : component === "Update Blog" ? (
            <UpdateBlog />
          ) : (
            <MyBlog />
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard;
