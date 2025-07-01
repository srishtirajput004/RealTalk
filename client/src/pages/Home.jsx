import React from 'react'
import AppLayout from '../Components/Layout/AppLayout'
import { Typography,Box } from '@mui/material'
import { grayColor } from '../constants/color'

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography variant='h5' p={"2rem"} textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);
