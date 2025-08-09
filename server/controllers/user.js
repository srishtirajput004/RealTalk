import { compare } from "bcrypt";
import {User} from "../models/user.js"
import {Chat} from "../models/chat.js"
import {sendToken} from "../utils/features.js"
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";

//create a new user, save it to database, save token in cookie
const newUser=async(req,res)=>{

    const {name,username,password,bio}=req.body;
    

    const avatar={
        public_id:"sdfgt",
        url:"huyvnuhfuh",
    };
    const user=await User.create({name,
        bio,
        username,
        password,
        avatar});

    sendToken(res,user,201,"User created");
};

//login user and save token in cookie
const login=TryCatch(async(req,res,next)=>{
    const {username,password}=req.body;

    const user=await User.findOne({username}).select("+password");
    if(!user)return next(new ErrorHandler("Invalid Username or Password",404));  //error.js in middlewares
    const isMatch=await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Username or Password",404));

    sendToken(res,user,200,`Welcome back,${user.name}!`);
});

const getMyProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user);  //.select("-password") bhi krskte h but default password false h toh yaha zarurat nhi 
    res.status(200).json({
        success:true,
        user,
    });
}); 

const logout=TryCatch(async(req,res)=>{
    return res
    .status(200)
    .cookie("chattu-token","",{...cookieOptions,maxAge:0})
    .json({
        success:true,
        message:"logged out successfully",
    });
}); 

const searchUser=TryCatch(async(req,res)=>{
    const {name=""}=req.query;

    const myChats=await Chat.find({groupChat:false,members:req.user});

    //all users from my chats means friends or people I have chatted with
    const allUsersFromMyChats=myChats.flatMap((chat)=>chat.members);

    const allUsersExceptMeAndFriends=await User.find({
        _id:{$nin:allUsersFromMyChats},
        name:{$regex:name,$options:"i"},
    });

    const users=allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({
        _id,name,
        avatar:avatar.url,
    }));

    return res
    .status(200)
    .json({
        success:true,
        users,
    });
});



export {login,newUser,getMyProfile,logout,searchUser};