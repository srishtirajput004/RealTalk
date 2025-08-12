import express from "express"

import {connectDB} from "./utils/features.js"
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser"
import adminRoute from "./routes/admin.js"
import userRoute from "./routes/user.js"
import chatRoute from "./routes/chat.js" 
import { createUser } from "./seeders/user.js";
import { createGroupChats, createMessages, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";

dotenv.config({
    path:"./.env",
});
const mongoURI=process.env.MONGO_URI;
const port=process.env.PORT || 3000;

const adminSecretKey=process.env.ADMIN_SECRET_KEY || "asdgyiutrey";

connectDB(mongoURI);

// createSingleChats(10);
// createGroupChats(10);
// createMessagesInAChat("6890f570e444210c6961a7ff",50); 

const app=express();

//using middlewares here
app.use(express.json());   //".json" to access json data
// app.use(express.urlencoded());   //".urlencoded" to access form data
app.use(cookieParser());

app.use('/user',userRoute);   //'/user' is prefix here
app.use('/chat',chatRoute); 
app.use('/admin',adminRoute); 

app.get("/",(req,res)=>{
    res.send("hellooooo");
});

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`server is running on port ${port} in ${process.env.NODE_ENV} Mode`);
});

export{
    adminSecretKey,
}