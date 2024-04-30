import { Box, IconButton, List, ListItem, ListItemText, Typography, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { add, differenceInDays, endOfMonth, format, startOfMonth, sub } from 'date-fns';

const Eventitem = ({event}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <List>
      <ListItem sx={{backgroundColor: `${colors.greenAccent[500]}`, borderRadius:"3px"}}>
        <ListItemText primary={<Typography>{event.title}</Typography>} secondary={<Typography>{event.date}</Typography>}></ListItemText>
      </ListItem>
    </List>
  )
}
const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const numOfDays = differenceInDays(endDate, startDate) + 1;
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const prevMonth = () => {
    const result = sub(date, {months: 1});
    setDate(result);
  }
  const nextMonth = () =>{
    const result = add(date, {months: 1});
    setDate(result);
  }
  let nextId = 1;
  const addEvent = (selectedDate) =>{
    let month = date.getMonth();
    let year = date.getFullYear();
    const title = prompt("Please enter a new title for your event");
    if(title!=="" && title !== null){
      setEventList([...eventList, {id: nextId++ , title: title, date: format(new Date(year, month, selectedDate), "MMM dd, yyyy")}]);
    }
  }
  // useEffect(()=>{
  //   let month = date.getMonth();
  //   let year = date.getFullYear();
  // },[date]);

  return (
    <Box m="20px">
        <Header title="CALENDAR" subtitle="Full Calendar Interactive Page"></Header>
        <Box display="flex" flexDirection="row" justifyContent="space-between" gap="20px" height="75vh" overflow="auto" >
          <Box sx={{backgroundColor: `${colors.primary[400]}`, p: '15px', borderRadius: "4px", flex: "1 1 20%", width: "15%", overflow: "auto"}}>
            <Typography variant='h5' m="0 0 5px 0">Events</Typography>
            {eventList.map((event)=>(
              <Eventitem key={event.id} event = {event}/>
            ))}
          </Box>
          <Box display="flex" flexDirection="column" width="85%" gap="10px">
            <Box display="flex" justifyContent="space-between" flexDirection='row'>
              <Box display="flex" flexDirection="row" gap="15px">
              <Box sx={{backgroundColor: '#2c3e50', borderRadius:"3px", padding: 0}}>
                <IconButton sx={{'&:hover':{backgroundColor: '#1e2b37', borderRadius: "0px !important"}}} onClick={prevMonth}>
                  <ChevronLeftRoundedIcon sx={{fontSize: 25, color: "white"}}/>
                </IconButton>
                <IconButton sx={{'&:hover':{backgroundColor: '#1e2b37', borderRadius: "0px !important"}}} onClick={nextMonth}>
                  <ChevronRightRoundedIcon sx={{fontSize: 25, color: "white"}}/>
                </IconButton>
              </Box>
              <Button sx={{backgroundColor: '#2c3e50', borderRadius:"3px", color:"white", '&:hover':{backgroundColor: '#1e2b37'}}} onClick={()=>setDate(new Date())}>Today</Button>
              </Box>
              <Typography variant='h3' fontWeight="bold">{format(date, "LLLL yyyy")}</Typography>
              <Box sx={{backgroundColor: '#2c3e50'}} display="flex" alignItems="center" borderRadius="3px" padding="4px">
                <Button sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}}>month</Button>
                <Button sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}}>week</Button>
                <Button sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}}>day</Button>
              </Box>
            </Box>
            <Box m="15px">
            <Grid container spacing={1} columns={7}>
              {weeks.map((week)=>(
                <Grid key={week} xs={1} fontSize={16} fontWeight="bold" sx={{mb: "15px", textAlign: "center"}}>{week}</Grid>
              ))}
              {Array.from({length: prefixDays}).map((_,index)=>(
                <Grid key={index} xs={1} fontSize={16} sx={{border: "0.25px solid lightgray"}}></Grid>
              ))}
              {Array.from({length: numOfDays}).map((_,index)=>(
                <Grid key={index} xs={1} fontSize={15} sx={{border: "0.25px solid", p: "2px 8px 50px 50px", textAlign: "right", "&:active": {backgroundColor: "slategrey"}}} onClick={()=>addEvent(index+1)} display="flex" flexDirection="column">
                  <Box>{ index+1 }</Box>
                  <Box></Box>
                </Grid>

              ))}
               {Array.from({length: suffixDays}).map((_,index)=>(
                <Grid key={index} xs={1} fontSize={16} sx={{border: "0.25px solid lightgray"}}></Grid>
              ))}
            </Grid>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default Calendar;
