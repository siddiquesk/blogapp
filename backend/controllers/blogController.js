import mongoose from "mongoose";
import Blog from "../Models/blogModel.js"
import { v2 as cloudinary } from "cloudinary";
import User from "../Models/userModel.js";

export const createBlog = async (req, res) => {
  try {
    // Step 1: Validate uploaded photo
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ msg: "Blog image is required." });
    }

    const {blogImage} = req.files;
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({ msg: "Only JPG, JPEG, PNG, and WEBP formats are allowed." });
    }

    // Step 2: Extract and validate input fields
    const { title, category, about} = req.body;

    if (!title || !category || !about) {
      return res.status(400).json({ msg: "title about category required" });
    }
   const adminName=req?.user?.name;
   const adminPhoto=req?.user?.photo.url;
   const createdBy=req?.user?._id;

    // Step 4: Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ msg: "Cloudinary upload error." });
    }

    // Step 6: Create new user
    const blogData = await Blog.create({
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    // Step 8: Respond with success
    return res.status(201).json({
      msg: "Blog created successfully.",
      blog: blogData,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error.",
      error: err.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
   const {id}=req.params;
   const blog = await Blog.findById(id);
   if(!blog){
    return res.status(400).json("blog not found ");
   }
   await blog.deleteOne();
   res.status(200).json({msg:'Blog deleted succefully '});
  } catch (err) {
    return res.status(500).json({
      msg: "Server error.",
      error: err.message,
    });
  }
};

export const getAllBlogs=async(req,res)=>{
  try{
   const blogs=await Blog.find({});
   if(!blogs){
    return res.status(401).json({msg:'no blogs present'});
   }
   res.status(200).json({msg:'blog fetched succefully',blogs});
  }catch(err){
  return res.status(500).json({
      msg: "Server error.",
      error: err.message,
    });
  }
}



// ✅ Get a single blog by ID
export const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "No blog found" });
    }
    res.status(200).json({ msg: "Blog fetched successfully", blog });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get all blogs created by a single user
export const myBlogs = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const blogs = await Blog.find({ createdBy });
    res.status(200).json({ msg: "User's blogs fetched", blogs });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// ✅ Update a blog by ID
export const updatedBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ msg: "Title, category, and about are required." });
    }

    // ✅ Handle image update
    if (req.files && req.files.blogImage) {
      const file = req.files.blogImage;
      const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

      if (!allowedFormats.includes(file.mimetype)) {
        return res.status(400).json({ msg: "Only JPG, JPEG, PNG, and WEBP formats are allowed." });
      }

      // ❌ Delete old image from Cloudinary
      if (blog.blogImage && blog.blogImage.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
      }

      // ✅ Upload new image
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      blog.blogImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // ✅ Update text fields
    blog.title = title;
    blog.category = category;
    blog.about = about;

    const updatedBlog = await blog.save();

    return res.status(200).json({
      msg: "Blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ msg: "User fetched successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get all admin users
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    res.status(200).json({ msg: "Admins fetched successfully", admins });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
