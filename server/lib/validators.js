import { body, param, validationResult } from "express-validator";
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

const adminLoginValidator=()=>[
    body("secretKey","Please enter secret Key").notEmpty(),
    
];

export {
    acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator, loginValidator,
    newGroupValidator, registerValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, sendRequestValidator, validateHandler
};
