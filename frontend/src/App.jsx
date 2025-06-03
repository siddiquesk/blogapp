import React from 'react'
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Wrapper from './home/Wrapper'
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Creator from "./pages/Creators"
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import UpdateBlog from './dashboard/UpdateBlog'
import About from './pages/About';
import { Toaster } from 'react-hot-toast';
import Detail from './pages/Detail'
import { useAuth } from './context/AuthProvider'
import NotFound from './pages/NotFound'
function App() {
  const { blogs, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const hideNavbar = ["/login", "/register", "/dashboard"].includes(location.pathname);

  // Agar abhi profile fetch ho raha hai toh loading dikhayenge
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );
  }
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={isAuthenticated ? <Wrapper /> : <Navigate to="/login" />} />
        <Route path='/about' element={<About />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/creator' element={<Creator />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Update blogs */}
        <Route path='/blog/update/:id' element={<UpdateBlog />} />
        <Route path='/blog/:id' element={<Detail />} />
        {/* Page not found */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Toaster />
      {!hideNavbar && <Footer />}
    </>
  )
}

export default App
