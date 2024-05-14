import React from 'react'
import ".././index.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';
const Modal = ({title, children, onClose}) => {
  return (
    <div className='modal'>
        <div className='modal-header'>
            {title}
            <IconButton onClick={onClose} color='black'>
                <CloseRoundedIcon/>
            </IconButton> 
        </div>
       {children}
    </div>
  )
}

export default Modal;
