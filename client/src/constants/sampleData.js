export const sampleChats=[{
    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"John Doe",
    _id:"1",
    groupChat:false,
    members:["1","2"],
},

{
    avatar:["https://www.w3schools.com/howto/img_avatar.png",],
    name:"John Boii",
    _id:"2",
    groupChat:true,
    members:["1","2"],
},

];

export const sampleUsers=[{
    avatar:["https://www.w3schools.com/howto/img_avatar.png",],
    name:"John Doe",
    _id:"1",
    
},
{
    avatar:["https://www.w3schools.com/howto/img_avatar.png",],
    name:"John Boii",
    _id:"2",
    
},
]; 

export const sampleNotifications=[{
    sender:{
        avatar:["https://www.w3schools.com/howto/img_avatar.png",],
    name:"John Doe",
    },
    _id:"1",
    
},
{
   sender:{
    avatar:["https://www.w3schools.com/howto/img_avatar.png",],
    name:"John Boii",
   },
    _id:"2",
    
},]; 

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "here is a message for you",
    _id: "sfnsdjkfsdnfkjsbnd",
    sender: {
      _id: "user._id",
      name: "Chaudhary",
    },
    chat: "chatId", 
    createdAt: "2025-06-27T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "here is a message for you",
    _id: "sfnsdjkfsdnfkjsbndnhuytuiii",
    sender: {
      _id: "dfgtyuhy",
      name: "Chaudhary",
    },
    chat: "chatId",
    createdAt: "2025-06-27T10:41:30.630Z",
  },
];

export const dashboardData={
  users:[{
    name:"John Doe",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
    _id:"1",
    username:"john_doe",
    friends:"20",
    groups:"5",
  },
  {
    name:"John Boi",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
    _id:"2",
    username:"john_boi",
    friends:"25",
    groups:"3",
  },
],
chats:[{
  name:"Funky Group",
  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
  _id:"1",
  groupChat:false,
  members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
    {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
  totalMembers:2,
  totalMessages:20,
  creator:{
    name:"John Doe",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
  },
},
{
  name:"Skibbidi",
  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
  _id:"2",
  groupChat:false,
  members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
    {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
  totalMembers:4,
  totalMessages:45,
  creator:{
    name:"John Boi",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
  },
},
],
messages:[
  {
    attachments:[],
    content:"Helloo, this is me!",
    _id:"dfghyuiomnbv",
    sender:{
      avatar:"https://www.w3schools.com/howto/img_avatar.png",
      name:"Charchit",
    },
    chat:"chatID", 
    groupChat:false,
    createdAt:"2024-02-12T10:41:30.630Z",
  },
  {
    attachments:[
      {
        public_id:"asad 2",
        url:"https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content:"",
    _id:"hjuyiower",
    sender:{
      avatar:"https://www.w3schools.com/howto/img_avatar.png",
      name:"Chamaat 2",
    },
    chat:"chatID",
    groupChat:true,
    createdAt:"2024-02-12T20:42:30.630Z",
  },
],
}