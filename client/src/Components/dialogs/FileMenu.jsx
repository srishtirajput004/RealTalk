import React from 'react'
import {Menu} from "@mui/material"

const FileMenu = ({anchorE1}) => {
  return (
    <Menu anchorE1={anchorE1} open={false}>
        <div style={{
            width : "10rem", 
        }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Fugit magni rerum fugiat dignissimos ipsa facilis nulla quas aut ut deleniti.
        </div>
    </Menu>
  )
}

export default FileMenu
