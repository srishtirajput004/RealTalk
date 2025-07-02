import React from 'react'
import {Dialog, DialogTitle, Stack} from "@mui/material"
import {sampleUsers} from "../../constants/sampleData"

const AddMemberDialog = ({addMember,isLoadingAddMember,chatId}) => {
  return (
   <Dialog open>
        <Stack>
            <DialogTitle>Add member</DialogTitle>

            <Stack>
                {
                    sampleUsers.map((i)=>{
                        
                    })
                }
            </Stack>
        </Stack>
   </Dialog>
  )
}

export default AddMemberDialog
