import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

// 🔐 Create JWT and store in cookie & DB
const createTokenJwt = async (userId, res) => {
  // Create token using userId and secret key
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
  );

  // Set token as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,     // JS can't access it
    sameSite: "strict", // Prevent CSRF
    path: "/",          // Available across the site
  });

  // Save token to user's record in DB
  await User.findByIdAndUpdate(userId, { token });

  return token;
};

export default createTokenJwt;
