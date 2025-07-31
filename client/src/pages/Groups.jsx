import React ,{useState, memo, useEffect, lazy, Suspense} from 'react'
import {Grid, IconButton, Tooltip,Box , Drawer, Stack, Typography, TextField, Button, Backdrop } from "@mui/material"
import {KeyboardBackspace as KeyboardBackspaceIcon , Menu as MenuIcon, 
  Edit as EditIcon, Done as DoneIcon,Delete as DeleteIcon, Add as AddIcon} from "@mui/icons-material"
import {  orange, matBlack} from '../constants/color'
import {useNavigate , useSearchParams} from "react-router-dom"
import {Link} from "../Components/Styles/StyledComponents"
import AvatarCard from '../Components/shared/AvatarCard'
import {sampleChats,sampleUsers} from "../constants/sampleData"
import UserItem from "../Components/shared/Useritem"
const ConfirmDeleteDialog=lazy(()=>import("../Components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog=lazy(()=>import("../Components/dialogs/AddMemberDialog"))


const isAddMember = false;  // from redux

const Groups = () => {

  const [isMobileMenuOpen , setIsMobileMenuOpen] = useState(false);
  const chatId=useSearchParams()[0].get("group");
  const navigate=useNavigate();
  const navigateBack=() => {
    navigate("/");
  };
  
  const [isEdit, setIsEdit]=useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const handleMobile=()=>{
      setIsMobileMenuOpen((prev)=> !prev);
  }
 
  const handleMobileClose=()=> setIsMobileMenuOpen(false);

  const updateGroupName=() => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  }

  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true);
    console.log("delete group");
  }
  const closeConfirmDeleteHandler=()=>{
     setConfirmDeleteDialog(false);
  }
  const openAddMemberHandler=()=>{
    console.log("add member");
  }

  const deleteHandler=()=>{
    console.log("delete handler");
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler=(id)=>{
    console.log("Remove Member",id);
  };

  useEffect(() => {
    if(chatId){
        setGroupName(`Group Name ${chatId}`);
        setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () =>{
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
      setConfirmDeleteDialog(false); 
    };

  }, [chatId]);

  const IconBtns=<>

    <Box sx={{
      display:{
        xs:"block",
        sm:"none",
        position:"fixed",
        right:"1rem",
        top:"1rem",
      }
    }}>
       <IconButton onClick={handleMobile}>
      <MenuIcon/>
    </IconButton>
     
    </Box>

    <Tooltip title="back">
      <IconButton sx={{
        position:"absolute",
        left:"2rem",
        top:"2rem",
        bgcolor:matBlack,
        color:"white",
        ":hover":{
          bgcolor:"rgba(0,0,0,0.7)",
        }
      }} onClick={navigateBack}>
        <KeyboardBackspaceIcon/>
      </IconButton>
    </Tooltip>
  </>

  const GroupName=(
  <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {
      isEdit? <>
        <TextField value={groupNameUpdatedValue} onChange={(e)=> {setGroupNameUpdatedValue(e.target.value)}}/>
        <IconButton onClick={updateGroupName}>
          <DoneIcon/>
        </IconButton>
      </> : <>
      <Typography variant='h4' paddingLeft={"4rem"}>{groupName}</Typography>
      <IconButton onClick={() => setIsEdit(true)}><EditIcon/></IconButton>
      </>
    }
  </Stack>
  );

  const ButtonGroup=<Stack
    p={{
      sm:"1rem",
      xs:"0",
      md:"1rem 4rem",
    }}
    spacing={"1rem"}
    direction={{
      sm:"row",
      xs:"column-reverse",
    }}> 
    <Button size="large" color='error' startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>
         Delete Group
    </Button>
    <Button size="large" variant='contained' startIcon={<AddIcon/>} onClick={openAddMemberHandler}>
         Add Member
    </Button>
  </Stack>

  return (
   <Grid container height={"100vh"}>
      <Grid item sx={{
        display:{
          xs: "none",
          sm:"block",
        },
         width: '30%', 
         maxWidth: '400px', 
         minWidth: '300px',
         flexShrink: 0,
      }} sm={5}> 
          <GroupsList myGroups={sampleChats} chatId={chatId}/>
      </Grid>

      <Grid item  xs={12} sm={7} sx={{
        height:"100vh",
        overflowY:"auto",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem",
         boxSizing: "border-box",
        //  width:'70%',
        flex:1,
      }}>
        {IconBtns}

        {groupName && <>

        {GroupName}
        <Typography variant='body1' margin={"2rem"} alignSelf={"flex-start"}>Members</Typography>
        <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} padding={{
          sm:"1rem",
          xs:"0",
          md:"1rem 4rem",
        }} spacing={"2rem"} flex={1} overflow={"auto"}>

          {/* members card */}
          {
            sampleUsers.map((i)=>(
               <UserItem key={i._id} user={i} isAdded styling={{
                boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                padding:"1rem 2rem",
                borderRadius:"0.5rem",
               }} handler={removeMemberHandler}/>
            ))
          }

        </Stack>

        {ButtonGroup}
        
        </>}

      </Grid>

      {
        isAddMember && ( <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      )}

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog open={confirmDeleteDialog} 
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}/>
        </Suspense>
      }

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} sx={{
        display:{
          xs:"block",
          sm:"none",
        },
      }}>
          <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Drawer>

   </Grid>
  )
};
const GroupsList=memo(({w="100%", myGroups=[],chatId})=> (
  <Stack width={w} bgcolor={orange} sx={{
   height:"100vh",
   overflowY:"auto",
    background: "linear-gradient(to bottom, #f8cdda, #f88b9c)",
  }}>
    {
      myGroups.length>0 ?
       (myGroups.map((group)=><GroupListItem group={group} chatId={chatId} key={group._id}/>)) : 
       (<Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>)
    }
  </Stack>
));

const GroupListItem=memo(({group,chatId})=>{
  const {name,avatar,_id}=group;

  return <Link to={`?group=${_id}`} onClick={(e)=>{
    if(chatId === _id) e.preventDefault();
  }}>
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
    <AvatarCard avatar={avatar}/>
    <Typography>{name}</Typography>
  </Stack>
  </Link>;
});

export default Groups
