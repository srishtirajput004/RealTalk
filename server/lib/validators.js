import {body,validationResult,check,param} from "express-validator"
import { ErrorHandler } from "../utils/utility.js";

const validateHandler=(req,res,next)=>{
    const errors=validationResult(req);

    const errorMessages=errors.array().map((error)=>error.msg).join(",");

    console.log(errorMessages);

    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages,400));
};

const registerValidator=()=>[
    body("name","Please Enter Name").notEmpty(),
    body("username","Please Enter Username").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
    body("bio","Please Enter Bio").notEmpty(),
    check("avatar","Please upload avatar"),
];

const loginValidator=()=>[
    body("username","Please Enter Username").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
];

const newGroupValidator=()=>[
    body("name","Please Enter Name").notEmpty(),

    body("members")
    .notEmpty().withMessage("Please Enter Members")
    .isArray({min:2,max:100}).withMessage("Members must be between 2-100"),
];

const addMemberValidator=()=>[
    body("chatId","Please Enter chat ID").notEmpty(),

    body("members")
    .notEmpty().withMessage("Please Enter Members")
    .isArray({min:1,max:97}).withMessage("Members must be between 1-97"),
];

const removeMemberValidator=()=>[
    body("userId","Please Enter user ID").notEmpty(),
    body("chatId","Please Enter chat ID").notEmpty(),
];

const sendAttachmentsValidator=()=>[
    body("chatId","Please Enter chat ID").notEmpty(),
     check("files")
     .notEmpty().withMessage("Please upload attachments")
    .isArray({min:1,max:5}).withMessage("Attachments must be between 1-5"),
];

const chatIdValidator=()=>[
    param("id","Please Enter chat ID").notEmpty(),
];

const renameGroupValidator=()=>[
    param("id","Please Enter chat ID").notEmpty(),
    body("name","Please enter name").notEmpty(),
];

const sendRequestValidator=()=>[
    body("userId","Please enter userId").notEmpty(),
];

const acceptRequestValidator=()=>[
    body("requestId","Please enter requestId").notEmpty(),
     body("accept")
     .notEmpty().withMessage("Please add accept")
     .isBoolean().withMessage("Accept must be boolean"),
];

export {registerValidator,
    validateHandler,
    loginValidator,
    newGroupValidator,
    addMemberValidator,
    removeMemberValidator,
    sendAttachmentsValidator,
    chatIdValidator,
    renameGroupValidator,
    sendRequestValidator,
    acceptRequestValidator,
};