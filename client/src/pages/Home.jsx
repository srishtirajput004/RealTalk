import React from 'react'
import AppLayout from '../Components/Layout/AppLayout'
import { Typography,Box } from '@mui/material'

const Home = () => {
  return (
    <Box bgcolor={"gray"} height={"100%"}>
      <Typography variant='h5' p={"2rem"} textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);
