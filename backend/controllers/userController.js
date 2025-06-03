import User from "../Models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenJwt from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    // Step 1: Validate uploaded photo
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ msg: "Image file is required." });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({ msg: "Only JPG, JPEG, PNG, and WEBP formats are allowed." });
    }

    // Step 2: Extract and validate input fields
    const { name, email, education, password, role, phone } = req.body;

    if (!name || !email || !education || !password || !role || !phone) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Step 3: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already registered." });
    }

    // Step 4: Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ msg: "Cloudinary upload error." });
    }

    // Step 5: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 6: Create new user
    const newUser = await User.create({
      name,
      email,
      education,
      password: hashedPassword,
      role,
      phone,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    // Step 7: Generate JWT token and set cookie
    const token = await createTokenJwt(newUser._id, res);

    // Step 8: Respond with success
    console.log('registerd token',token);
    return res.status(201).json({
      msg: "User created successfully.",
      user: newUser,
      token:token,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error.",
      error: err.message,
    });
  }
};


export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const user = await User.findOne({ email }).select("+password"); // by default schema mai password field un select hai isliye yha pe password field chaiye 
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    if (user.role !== role) {
      return res.status(400).json({ msg: "Given role is not matched." });
    }

    const token = await createTokenJwt(user._id, res);
        console.log('login token',token);
    return res.status(200).json({
      msg: "User login successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error.",
      error: err.message,
    });
  }
};


/*1. User sends email, password, role ➜
2. Email se user find karo + password le aao (select +password) ➜
3. Password match karo ➜
4. Role match karo ➜
5. Token banao ➜ Cookie me save karo ➜
6. Response send karo
 */



export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true, // optional: ensures cookie is cleared only over HTTPS
      sameSite: "strict", // optional: helps prevent CSRF
    });
    return res.status(200).json({ msg: "User logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
