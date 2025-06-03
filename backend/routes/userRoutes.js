import express from 'express'
const router=express.Router();
import {register,login,logout} from "../controllers/userController.js"
import { isAuthenticated } from '../middleware/authUser.js';

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout)
export default router;
