import React from 'react';
import { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import user from '../../assets/woman-profile-cartoon_18591-58480.avif';
import { tokens } from "../../theme";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';


const Item = ({title, to, selected, icon, setSelected}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem active={selected === title} style={{color: colors.grey[100]}} onClick={()=>setSelected(title)} icon={icon} component={<Link to={to}></Link>}>
            <Typography>{title}</Typography>
        </MenuItem>
    )
}
function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('dashboard');
  return (
   <Box height="100vh" overflow="auto">
    <ProSidebar collapsed={isCollapsed} backgroundColor={`${colors.primary[400]}`}>
        <Menu iconShape="square">
            <MenuItem 
            onClick={()=>setIsCollapsed(!isCollapsed)} 
            icon={isCollapsed ? <MenuOutlinedIcon/> : ''}
            style={{
                margin: '10px 0px 10px 0px',
                color: colors.grey[100]
            }}
            >
                {!isCollapsed && (
                    <Box 
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px">
                        <Typography variant='h4' color={colors.grey[100]}>
                            ADMIN
                        </Typography>
                        <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                            <MenuOutlinedIcon/>
                        </IconButton>
                    </Box>
                )}
            </MenuItem>
            {!isCollapsed && (
                <Box mb='10px'>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img alt='profile user' width='90px' height='90px' src={user} style={{cursor: 'pointer', borderRadius: '50%'}}/>  
                    </Box>
                    <Box textAlign='center'>
                        <Typography variant='h2' color={colors.grey[100]} fontWeight='bold' sx={{m: '10px 0 0 0', letterSpacing: "1px"}}>Sravya</Typography>
                        <Typography variant='h5' color={colors.greenAccent[500]} sx={{m: '5px 0 0 0'}}>ADMIN</Typography>
                    </Box>
                </Box>
            )}
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                <Item title='Dashboard' to='/' icon={<HomeOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Typography variant='h6' color={colors.grey[100]} sx={{m: "10px 0px 5px 20px"}}>Data</Typography>
                <Item title='Manage Team' to='/team' icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Contacts' to='/contacts' icon={<ContactsOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Invoice Balances' to='/invoices' icon={<ReceiptOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Typography variant='h6' color={colors.grey[100]} sx={{m: "10px 0px 5px 20px"}}>Pages</Typography>
                <Item title='Profile Form' to='/form' icon={<PersonOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='FAQ Page' to='/faq' icon={<HelpOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Typography variant='h6' color={colors.grey[100]} sx={{m: "10px 0px 5px 20px"}}>Charts</Typography>
                <Item title='Bar Chart' to='/bar' icon={<BarChartOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Pie Chart' to='/pie' icon={<PieChartOutlineOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Line Chart' to='/line' icon={<TimelineOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Geography Chart' to='/geography' icon={<MapOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
                <Item title='Calendar' to='/calendar' icon={<CalendarTodayOutlinedIcon/>} selected={selected} setSelected={setSelected}></Item>
            </Box>
        </Menu>
    </ProSidebar>
   </Box>
  )
}
export default Sidebar;
