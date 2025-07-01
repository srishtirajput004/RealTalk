import React, { useRef } from 'react';
import AppLayout from '../Components/Layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { grayColor , orange} from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from "../Components/Styles/StyledComponents";
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../Components/shared/MessageComponent';
import FileMenu from '../Components/dialogs/FileMenu';

const user={
  _id: "dfgtyuhy",
  name: "Shreya Gupta"
}

const Chat = () => {
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);



  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add your message sending logic here
    console.log("Message sent:", messageInputRef.current.value);
    messageInputRef.current.value = "";
  };

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* Message display area */}
      <Stack 
        ref={containerRef} 
        boxSizing="border-box" 
        padding="1rem"
        spacing="1rem" 
        bgcolor={grayColor} 
        height="90%" 
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
       
        {
          sampleMessage.map((i)=>(
            <MessageComponent key={i._id} message={i} user={user}/>
          ))
        }

      </Stack>

      {/* Message input form */}
      <form 
        style={{
          height: "10%",
          padding: "0 1rem",
          backgroundColor: grayColor,
        }}
        onSubmit={handleSendMessage}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          height="100%"
          bgcolor="#fff"
          borderRadius="1.5rem"
          padding="0 1rem"
          position="relative"
        >
          <IconButton onClick={handleAttachFile} sx={{rotate: "30deg"}}>
            <AttachFileIcon />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />

          <InputBox 
            placeholder="Type a message..." 
            fullWidth
            inputRef={messageInputRef}
          />

          <IconButton type="submit" sx={{
            rotate: "-30deg",
            backgroundColor: orange,
            color: "white", 
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover":{
              bgcolor: "error.dark",
            }
          }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
