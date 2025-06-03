import express from 'express';
const router = express.Router();

// 🧠 Controller imports
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  singleBlog,
  myBlogs,
  updatedBlogs,
  getMyProfile,
  getAdmins
} from '../controllers/blogController.js';

// 🔐 Middleware imports
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";

// =====================
// 📌 Blog Routes
// =====================

// ✅ Create a new blog (Admin only)
router.route("/create").post(isAuthenticated, isAdmin("admin"), createBlog);

// ✅ Delete a blog by ID (Admin only)
router.route("/delete/:id").delete(isAuthenticated, isAdmin("admin"), deleteBlog);

// ✅ Get all blogs (Any authenticated user)
router.route("/all-blogs").get(getAllBlogs);

// ✅ Get a single blog by ID (Any authenticated user)
router.route("/single-blog/:id").get(isAuthenticated, singleBlog);

// ✅ Get blogs created by current admin (Admin only)
router.route("/my-blog").get(isAuthenticated, isAdmin("admin"), myBlogs);

// ✅ Update a blog by ID (Admin only)
router.route("/update/:id").put(isAuthenticated, isAdmin("admin"), updatedBlogs);

// ✅ Get logged-in user's profile
router.route("/my-profile").get(isAuthenticated, getMyProfile);
router.route("/admin").get(getAdmins);

export default router;
