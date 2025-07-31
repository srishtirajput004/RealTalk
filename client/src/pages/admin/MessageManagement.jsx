import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Layout/AdminLayout'
import Table from "../../Components/shared/Table"
import {dashboardData} from "../../constants/sampleData"
import {fileFormat, transformImage} from "../../lib/Features"
import moment from 'moment'
import {Avatar,Stack,Box} from "@mui/material"
import RenderAttachment from "../../Components/shared/RenderAttachment"

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"attachments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
    const {attachments}=params.row;
     
    return attachments?.length>0 ? 
     attachments.map((i)=>{
        const url=i.url;
        const file=fileFormat(url);


      return <Box>
        <a href={url} download target='_blank' style={{
          color:"black",
        }}>
          {RenderAttachment(file,url)}
        </a>
      </Box>;
     })
    : "No Attachments";

    
},
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400,
},
{
  field:"sender",
  headerName:"Sent By",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>( 
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
      <span>{params.row.sender.name}</span>
    </Stack>
  ),
},
{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:220,
},
{
  field:"groupChat",
  headerName:"Group Chat",
  headerClassName:"table-header",
  width:100,
},
{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250,
},
];

const MessageManagement = () => {

  const [rows,setRows]=useState([]);

  useEffect(() => {
    setRows(dashboardData.messages.map((i)=>({
      ...i,
      id:i._id,
      sender:{
        name:i.sender.name,
        avatar:transformImage(i.sender.avatar,50),
      },
      createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
    })))
  }, [])
  

  return (
   <AdminLayout>
     <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>
   </AdminLayout>
  )
}

export default MessageManagement
