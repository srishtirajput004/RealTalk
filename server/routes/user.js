import express from "express"
import { login,newUser, getMyProfile ,logout,searchUser } from "../controllers/user.js ";
import {singleAvatar} from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { loginValidator, registerValidator, validateHandler } from "../lib/validators.js";


const app=express.Router();

//these 2 routes are where user is not logged in
app.post("/new",singleAvatar,registerValidator(),validateHandler,newUser);
app.post("/login",loginValidator(),validateHandler,login);

//after these 2, user must be logged in to access these routes
app.use(isAuthenticated); //neeche vaale saare routes ke liye this will work as middleware and executed before them
app.get("/me",getMyProfile);
app.get("/logout",logout);
app.get("/search",searchUser);

export default app;