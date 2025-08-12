import express from "express"
import {allChats, allMessages, allUsers, getDashboardStats,adminLogin,adminLogout, getAdminData} from "../controllers/admin.js"
import {validateHandler,adminLoginValidator} from "../lib/validators.js"
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

app.post("/verify",adminLoginValidator(),validateHandler,adminLogin);
app.get("/logout",adminLogout);

//only admin can access these routes
app.use(adminOnly);
app.get("/",getAdminData);

app.get("/users",allUsers);
app.get("/chats",allChats);
app.get("/messages",allMessages);
app.get("/stats",getDashboardStats);

export default app;