import React, { useContext } from 'react';
import '../../index.css';
import { ColorModeContext, tokens } from "../../theme";
import { Box} from '@mui/material';
import { IconButton, InputBase } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@emotion/react';

function Topbar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
    <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" backgroundColor = {colors.primary[400]} borderRadius="3px">
            <InputBase sx={{ml: 2, flex: 1}} placeholder='Search'/>
            <IconButton type='button' sx={{p: 1}}>
                <SearchIcon/>
            </IconButton>
        </Box>
        <Box display="flex" float="right">
        <IconButton onClick={colorMode.toggleColorMode}>
           {theme.palette.mode === "light" ? <DarkModeOutlinedIcon/> : <LightModeOutlinedIcon/>}
        </IconButton>
        <IconButton>
            <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <PersonOutlinedIcon/>
        </IconButton>
        </Box>
   </Box>
  )
}

export default Topbar
