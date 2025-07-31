import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Grid, Box } from '@mui/material';
import ChatList from "../specific/ChatList";
import { sampleChats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>

          <Grid  sm={4} md={2} lg={2} sx={{
            display: { xs: "none", sm: "block" },
            height:"100%",
          }} >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>

          <Grid xs={12} sm={8} md={8} lg={8} height={"100%"} >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            
            md={2}
            lg={2}
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "rgba(0,0,0,0.85)",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                padding: "2rem",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Profile />
            </Box>
          </Grid>

        </Grid>
      </>
    );
  };
};

export default AppLayout;