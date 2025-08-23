import express from "express"
import {connectDB} from "./utils/features.js"
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from "cookie-parser"
import {Server} from "socket.io"
import {createServer} from "http"
import {v4 as uuid} from "uuid"
import mongoose from "mongoose"
import cors from "cors"


import adminRoute from "./routes/admin.js"
import userRoute from "./routes/user.js"
import chatRoute from "./routes/chat.js" 

import { createUser } from "./seeders/user.js";
import { createGroupChats, createMessages, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
    path:"./.env",
});
const mongoURI=process.env.MONGO_URI;
const port=process.env.PORT || 3000;

const adminSecretKey=process.env.ADMIN_SECRET_KEY || "asdgyiutrey";

const userSocketIDs=new Map();

connectDB(mongoURI);

// createSingleChats(10);
// createGroupChats(10);
// createMessagesInAChat("6890f570e444210c6961a7ff",50); 

const app=express();
const server=createServer(app);
const io=new Server(server,{});

//using middlewares here
app.use(express.json());   //".json" to access json data
// app.use(express.urlencoded());   //".urlencoded" to access form data
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL,],
    credentials:true,
}))

app.use('/api/v1/user',userRoute);   //'/user' is prefix here
app.use('/api/v1/chat',chatRoute); 
app.use('/api/v1/admin',adminRoute); 

app.get("/",(req,res)=>{
    res.send("hellooooo");
});

//just like we access middlewares by app.use(), we can also do io.use()
io.use((socket,next)=>{ next(); })

io.on("connection",(socket)=>{

    const user={
        _id:new mongoose.Types.ObjectId(),
        name:"sona",
    };
    userSocketIDs.set(user._id.toString(),socket.id);
    console.log(userSocketIDs);

    socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

        const messageForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
            },
            chat:chatId,
            createdAt: new Date().toISOString(),
        };

         console.log("Received message:", messageForRealTime); 

        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId,
        };

        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message:messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId});

        try {
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected");
        userSocketIDs.delete(user._id.toString());
    });

});

app.use(errorMiddleware);

//after making "server" of app now listen is also done on server rather than "app.listen"
server.listen(port,()=>{
    console.log(`server is running on port ${port} in ${process.env.NODE_ENV} Mode`);
});

export{
    adminSecretKey,
    userSocketIDs,
} 