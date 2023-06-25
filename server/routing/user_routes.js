import express from "express";
import { getAllUsers, homeit, login, logout, signup } from "../controllers/user_controller.js";
import { Authenticate } from "../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.get('/',getAllUsers);
userRouter.get('/dashboard',Authenticate,homeit)
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get('/logout',logout);

export default userRouter;