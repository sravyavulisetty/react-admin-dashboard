import React,{useState, useRef} from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../theme';
const Accordion = ({title, content}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isActive, setisActive] = useState(false);
  return ( 
    <Box sx={{backgroundColor: `${colors.primary[400]}`}} mb="20px">
    <Box display="flex" justifyContent="space-between" pl="10px" alignItems="center">
        <Box color={`${colors.greenAccent[400]}`} fontSize="15px">{title}</Box>
        <IconButton color='white'>
            <ArrowDropDownIcon onClick={()=>setisActive((prev) => !prev)} style={{fontSize:"30px", rotate: !isActive ? "180deg" : "", transition: "0.5s ease-in-out"}}/>
        </IconButton>
    </Box>
    <Box>
        {isActive ? <Box p="10px 0px 10px 10px !important">{content}</Box> : ""}
    </Box>
    </Box>
  )
}

export default Accordion;
