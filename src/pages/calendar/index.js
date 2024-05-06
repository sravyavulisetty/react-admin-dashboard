import { Box, IconButton, List, ListItem, ListItemText, Typography, Grid, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { add, differenceInDays, endOfMonth, format, startOfMonth, sub, addDays, startOfWeek, weekStartsOn, subDays, addMinutes, getHours, getDay } from 'date-fns';
import '../../index.css';
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
  const ref = useRef(null);
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [startDateofWeek, setStartDateofWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [calType, setcalType] = useState("month");
  const [eventsInWeek, setEventsInWeek] = useState([]);
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const numOfDays = differenceInDays(endDate, startDate) + 1;
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateTimeSlotsForDay = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const timeSlot = new Date();
      timeSlot.setHours(hour, 0, 0, 0); 
      const formattedTime = timeSlot.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      timeSlots.push(formattedTime);
    }
    return timeSlots;
  };
  const timeSlotsForDay = generateTimeSlotsForDay();
  
  const prevMonth = () => {
    const result = sub(date, {months: 1});
    setDate(result);
  }
  const nextMonth = () =>{
    const result = add(date, {months: 1});
    setDate(result);
  }
  const addEvent = (selectedDate) =>{
    let month = date.getMonth();
    let year = date.getFullYear();
    const title = prompt("Please enter a new title for your event");
    if(title!=="" && title !== null){
      setEventList([...eventList, {title: title, date: format(new Date(year, month, selectedDate), "MMM dd, yyyy")}]);
    }
  }
  const hasEvent = (index) => {
    let month = date.getMonth();
    let year = date.getFullYear();
    const event = eventList.filter((event) => {
      return new Date(event.date).getTime() === new Date(year, month, index).getTime();
    });
    if (event) {
      return event;
    }
  }
  const deleteEvent = (index, title) => {
    let month = date.getMonth();
    let year = date.getFullYear();
    if (window.confirm(`Are you sure you want to delete the event? ${title}`)) {
      setEventList((eventList.filter((event) => 
        !(new Date(event.date).getTime() === new Date(year, month, index).getTime() && event.title === title)
      )));
    }
  }
  const calculateWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(format(addDays(startDateofWeek, i), 'MMM dd, yyyy'));
    }
    return dates;
  };
  const weekdays = calculateWeekDates();

  const nextWeekDates = () => {
    setStartDateofWeek(addDays(startDateofWeek, 7));
  }
  const previousWeekDates = () => {
    setStartDateofWeek(subDays(startDateofWeek, 7));
  }

  const nextDay = () => {
    setDate(addDays(date, 1));
  }
  const prevDay = () =>{
    setDate(subDays(date, 1));
  }

  const addWeekDay = (week, time) => {
    const year = new Date(week).getFullYear();
    const month = new Date(week).getMonth();
    const date = new Date(week).getDate();
    setDate(year, month, date);
    const title = prompt("Please enter a new title for your event");
    if(title!=="" && title !== null){
      setEventList([...eventList, {title: title, date: format(new Date(year, month, date), "MMM dd, yyyy")}]);
      setEventsInWeek([...eventsInWeek, {title: title, date: new Date(year, month, date), time: getHours(new Date(year, month, date, parseInt(time)))}])
    }
  }
  const hasWeekDay = (week) => {
    const year = new Date(week).getFullYear();
    const month = new Date(week).getMonth();
    const date = new Date(week).getDate();
    const event = eventsInWeek.filter((event) => {
      return new Date(event.date).getTime() === new Date(year, month, date);
    })
    if(event){
      return event.title;
    }
  }
  
  const handleTimeClick = (week, time) => {
    console.log(addMinutes(new Date(new Date(week).getFullYear(),new Date(week).getMonth(), new Date(week).getDate(), parseInt(time), 0), 30));
  }
  
  return (
    <Box m="20px" ref={ref}>
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
                <IconButton sx={{'&:hover':{backgroundColor: '#1e2b37', borderRadius: "0px !important"}}} onClick={calType === "month" ? prevMonth : calType === "week" ? previousWeekDates : prevDay}>
                  <ChevronLeftRoundedIcon sx={{fontSize: 25, color: "white"}}/>
                </IconButton>
                <IconButton sx={{'&:hover':{backgroundColor: '#1e2b37', borderRadius: "0px !important"}}} onClick={calType === "month" ? nextMonth : calType === "week" ? nextWeekDates : nextDay}>
                  <ChevronRightRoundedIcon sx={{fontSize: 25, color: "white"}}/>
                </IconButton>
              </Box>
              <Button sx={{backgroundColor: '#2c3e50', borderRadius:"3px", color:"white", '&:hover':{backgroundColor: '#1e2b37'}}} onClick={()=>setDate(new Date())}>Today</Button>
              </Box>
              <Typography variant='h3' fontWeight="bold">{calType === "month" ? format(date, "LLLL yyyy"): calType === "week" ? format(new Date(weekdays[0]), "LLL d") + " - " + format(new Date(weekdays[weekdays.length-1]), "LLL d") + ", " + date.getFullYear() : format(date, "MMM dd, yyyy")}</Typography>
              <Box sx={{backgroundColor: '#2c3e50'}} display="flex" alignItems="center" borderRadius="3px" padding="4px">
                <Button 
                sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}} 
                style={{backgroundColor: calType==="month" ? '#1e2b37' : ''}}
                onClick={()=>setcalType("month")}>
                month
                </Button>
                <Button 
                sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}} 
                style={{backgroundColor: calType==="week" ? '#1e2b37' : ''}}
                onClick={()=>setcalType("week")}>week</Button>
                <Button 
                sx={{color: 'white', '&:hover':{backgroundColor: '#1e2b37'}}} 
                style={{backgroundColor: calType==="day" ? '#1e2b37' : ''}}
                onClick={()=>setcalType("day")}>day</Button>
              </Box>
            </Box>
            {calType === "month" ? 
            <Box m="10px">
            <Grid container spacing={1} columns={7} height="65vh">
              {weeks.map((week)=>(
                <Grid key={week} xs={1} fontSize={16} fontWeight="bold" sx={{textAlign: "center", border: "0.5px solid lightgray"}}>{week}</Grid>
              ))}
              {Array.from({length: prefixDays}).map((_,index)=>(
                <Grid key={index} xs={1} fontSize={14} sx={{border: "0.25px solid lightgray", height: "calc((100vh - 7 * 15px) / 7)"}}></Grid>
              ))}
              {Array.from({length: numOfDays}).map((_,index)=>{
                const num = index+1;
                return <Grid
                      key={num} 
                      xs={1} 
                      fontSize={14}
                      sx={{position:"relative", height: "calc((100vh - 7 * 15px) / 7)",border: "0.5px solid", p: "2px", "&:active": {backgroundColor: "slategrey"}}} 
                      onClick={(e)=>addEvent(num, e)} 
                      display="flex" 
                      flexDirection="column"
                      style={{backgroundColor: (date.getDate() === num && date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth()) ? "grey": ""}}>
                    <Box textAlign = "right">{ num }</Box>
                    {hasEvent(num).length<=2 ? 
                    hasEvent(num).map((event)=>(
                    <Box
                    sx={{textAlign: "center", backgroundColor:"#3788d8", borderRadius: "2px",margin: "5px 3px 0px 3px", cursor: "pointer", overflow: "hidden", fontSize: "13px"}} 
                    onClick={(e) => {e.stopPropagation(); deleteEvent(num, event.title)}}>{event.title}</Box>
                    ))
                    : 
                    <Box>
                       <Box 
                       sx={{textAlign: "center", backgroundColor:"#3788d8", borderRadius: "2px", cursor: "pointer", overflow: "hidden", fontSize: "13px", marginTop: "5px"}} 
                       onClick={(e) => {e.stopPropagation(); deleteEvent(num,hasEvent(num)[0].title )}}
                       >
                        {hasEvent(num)[0].title}
                      </Box>
                      <Button 
                       sx={{color: "white", textTransform: "lowercase !important", textAlign:"center"}} 
                       onClick={()=>setShowEvents(!showEvents)}> +more </Button>
                       {showEvents ? 
                       <Box bgcolor={'white'} color={'black'} position="absolute" top="21%" right="2%" left="2%" padding="5px" zIndex="100">
                        <Typography>{format(new Date( date.getFullYear(), date.getMonth(), num), "PPP")}</Typography>
                        {hasEvent(num).map((event)=>(
                          <li 
                          onClick={(e)=>{e.stopPropagation(); deleteEvent(num, event.title)}} 
                          style={{cursor: "pointer"}}
                          >{event.title}</li>
                        ))}
                       </Box> : ""}
                    </Box>}
                </Grid>
              })}
               {Array.from({length: suffixDays}).map((_,index)=>(
                <Grid key={index} xs={1} fontSize={14} sx={{border: "0.25px solid lightgray", height: "calc((100vh - 7 * 15px) / 7)"}}></Grid>
              ))}
            </Grid>
            </Box>: calType === "week" ? 
            <Box m="5px" height="65vh" overflow="auto">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {weekdays.map((week)=>{
                      const weekDay = new Date(week)
                      return <th style={{height: "calc((20vh - 7 * 1px) / 7)"}}>{weeks[weekDay.getDay()] + " " + weekDay.getDate() + "/" + (weekDay.getMonth() + 1)}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                {timeSlotsForDay.map((time, timeIndex) => (
                  <>
                  <tr key={timeIndex}>
                    <td className='textLow'>{time}</td>
                    {weekdays.map((week)=>(
                      <td className="borderDotted" key={week} onClick={()=>addWeekDay(week, time)} style={{height: "calc((20vh - 7 * 1px) / 7)", backgroundColor: (new Date().getDate() === new Date(week).getDate()) ? "grey":""}}>{()=>hasWeekDay(week, time)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{height: "calc((20vh - 7 * 1px) / 7)"}}></td>
                    {weekdays.map((week)=>(
                      <td className="bordertopDotted" key={week} onClick={()=>console.log(addMinutes(time, 30))} style={{height: "calc((20vh - 7 * 1px) / 7)", borderTop:"none !important", backgroundColor: (new Date().getDate() === new Date(week).getDate()) ? "grey":"" }}></td>
                    ))}
                  </tr>
                  </>
                ))} 
                </tbody>
              </table>
            </Box> 
            : 
            <Box m="5px" height="65vh" overflow="auto">
              <table>
                <thead>
                  <tr>
                    <th></th>
                      <th style={{height: "calc((20vh - 7 * 1px) / 7)"}}>{weeks[getDay(date)]}</th>
                  </tr>
                </thead>
                <tbody>
                {timeSlotsForDay.map((time, timeIndex) => (
                  <>
                  <tr key={timeIndex}>
                    <td className='textLow'>{time}</td>
                    {/* {weekdays.map((week)=>(
                      <td className="borderDotted" key={week} onClick={()=>addWeekDay(week, time)} style={{height: "calc((20vh - 7 * 1px) / 7)", backgroundColor: (new Date().getDate() === new Date(week).getDate()) ? "grey":"" }}></td>
                    ))} */}
                  </tr>
                  <tr>
                    <td style={{height: "calc((20vh - 7 * 1px) / 7)"}}></td>
                    {/* {weekdays.map((week)=>(
                      <td className="bordertopDotted" key={week} onClick={()=>console.log(addMinutes(time, 30))} style={{height: "calc((20vh - 7 * 1px) / 7)", borderTop:"none !important", backgroundColor: (new Date().getDate() === new Date(week).getDate()) ? "grey":"" }}></td>
                    ))} */}
                  </tr>
                  </>
                ))} 
                </tbody>
              </table>
            </Box> }
          </Box>
        </Box>
    </Box>
  )
}

export default Calendar;
