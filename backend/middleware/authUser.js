import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware: Authenticate the user using JWT
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Authentication Token:", token);

    if (!token) {
      return res.status(401).json({ error: "User not authenticated. Token not found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    /*"ye line bus ye karta hai user kon hai jo login karne aaya hai kiya us ka token hai server ke pass cookie mai hai to aage jao website mai nhi hai error do"*/
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
};


// Middleware: Allow access only if user's role matches allowed roles
export const isAdmin = (...roles) => {
  // 'roles' contains allowed roles like ['admin', 'superadmin']
  return (req, res, next) => {
    // Check if logged-in user's role is not in the allowed roles
    if (!roles.includes(req.user.role)) {
      // If not authorized, return error response
      return res.status(403).json({
        error: `Access denied. User role '${req.user.role}' is not authorized.`,
      });
    }
    // If authorized, move to the next middleware or controller
    next();
  };
};


/* 
1	Client ne login ya signup kiya
✅ 2	Server ne JWT token diya aur cookie me set kiya
✅ 3	Client ne request bheji protected route ke liye
✅ 4	Server ne cookie se token nikala
✅ 5	Token verify kiya + decode kiya
✅ 6	DB me us decoded userId ke through user dhunda
🔒 7	Agar user mila → req.user = user → next()
❌ 8	Agar user nahi mila → error User not found 
*/

