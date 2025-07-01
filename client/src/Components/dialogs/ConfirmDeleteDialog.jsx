import React from 'react'
import {Dialog, DialogContent, DialogTitle, DialogContentText} from "@mui/material"

const ConfirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return (
   <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this group?</DialogContentText>
        </DialogContent>
        
   </Dialog>
  )
}

export default ConfirmDeleteDialog
