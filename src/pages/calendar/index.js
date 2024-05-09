import { Box, IconButton, List, ListItem, ListItemText, Typography, Grid, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import {format, isEqual} from 'date-fns'; 
import Header from '../../components/Header';
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { add, differenceInDays, endOfMonth, startOfMonth, sub, addDays, startOfWeek, weekStartsOn, subDays, addMinutes, getHours, getDay } from 'date-fns';
import '../../index.css';
import Modal from '../../components/Modal';
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
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const numOfDays = differenceInDays(endDate, startDate) + 1;
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showEvents && ref.current && !ref.current.contains(e.target)) {
        setShowEvents(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showEvents]);

  const generateTimeSlotsForDay = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      for(let minute = 0; minute < 60; minute= minute+30){
        const timeSlot = new Date();
        timeSlot.setHours(hour, minute, 0, 0); 
        const formattedTime = timeSlot.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true });
        timeSlots.push(formattedTime);
      }
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
  const addEvent = (selectedDate, time) =>{
    let month = date.getMonth();
    let year = date.getFullYear();
    const title = prompt("Please enter a new title for your event");
    if(title!=="" && title !== null){
      setEventList([...eventList, {title: title, date: format(new Date(year, month, selectedDate), "MMM dd, yyyy"), time: time}]);
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
  const hasEventinDay = (d, time) => {
    let month = date.getMonth();
    let year = date.getFullYear();
    const event = eventList.filter((event)=>{
      return (new Date(event.date).getTime() === new Date(year, month, d).getTime() && event.time === time)
    })
    if(event){
      return event;
    }
  }
  const deleteEvent = (index, title, time) => {
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
    const dateObj = new Date(week);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const date = dateObj.getDate();
    const title = prompt("Please enter a new title for your event");
    if(title!=="" && title !== null){
      setEventList([...eventList, {title: title, date: format(new Date(year, month, date), "MMM dd, yyyy"), time: time}]);
    }
  }
  const hasWeekDay = (week) => {
    const year = new Date(week).getFullYear();
    const month = new Date(week).getMonth();
    const date = new Date(week).getDate();
    const event = eventList.find((event) => {
      return (new Date(event.date).getTime() === new Date(year, month, date).getTime() && event.time === "all day");
    })
    if(event){
      return event;
    }
  }
  const hasWeekandTime =(week, time) => {
    const year = new Date(week).getFullYear();
    const month = new Date(week).getMonth();
    const date = new Date(week).getDate();
    const event = eventList.find((event)=>{
      return ((new Date(event.date).getTime() === new Date(year, month, date).getTime()) && event.time === time);
    })
    if(event){
      return event;
    }
  }  
  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page"></Header>
        <Box display="flex" flexDirection="row" justifyContent="space-between" gap="20px" height="75vh" overflow="auto" >
          <Box sx={{backgroundColor: `${colors.primary[400]}`, p: '15px', borderRadius: "4px", flex: "1 1 18%", width: "15%", overflow: "auto"}}>
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
              <Typography variant='h3' fontWeight="bold">
                {calType === "month" 
                ?
                format(date, "LLLL yyyy")
                : 
                calType === "week" 
                ?
                format(new Date(weekdays[0]), "LLL d") + " - " + format(new Date(weekdays[weekdays.length-1]), "LLL d") + ", " + date.getFullYear()
                : 
                format(date, "MMM dd, yyyy")}
                </Typography>
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
                      onClick={()=>{setShowEvents(false); addEvent(num, "all day");}} 
                      display="flex" 
                      flexDirection="column"
                      style={{backgroundColor: (date.getDate() === num && date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth()) ? "grey": ""}}>
                    <Box textAlign = "right">{ num }</Box>
                    { hasEvent(num).length<=2 ? 
                    hasEvent(num).map((event)=>(
                    <Box
                    sx={{textAlign: "start", backgroundColor:"#3788d8", borderRadius: "2px",margin: "5px 3px 0px 3px", cursor: "pointer", overflow: "hidden", fontSize: "12px", paddingLeft: "4px"}} 
                    onClick={(e) => {e.stopPropagation(); deleteEvent(num, event.title)}}>{event.title}</Box>
                    ))
                    : 
                    <Box onClick={()=>setShowEvents(false)}>
                       <Box 
                       sx={{textAlign: "center", backgroundColor:"#3788d8", borderRadius: "2px", cursor: "pointer", overflow: "hidden", fontSize: "12px", marginTop: "5px"}} 
                       onClick={(e) => {e.stopPropagation(); deleteEvent(num,hasEvent(num)[0].title)}}
                       >
                        {hasEvent(num)[0].title}
                      </Box>
                      <small 
                       style={{color: "white", textTransform: "lowercase !important", textAlign:"center", cursor: "pointer", margin: "2px"}} 
                       onClick={(e)=>{e.stopPropagation(); setShowEvents(true)}}>{`+${hasEvent(num).length-1} more`}</small>
                       {showEvents && 
                       <Modal title={format(new Date( date.getFullYear(), date.getMonth(), num), "PPP")} onClose={(e)=>{e.stopPropagation(); setShowEvents(false)}}>
                        {hasEvent(num).map((event)=>(
                          <li 
                          className='list-event'
                          onClick={(e)=>{e.stopPropagation(); deleteEvent(num, event.title)}} 
                          style={{cursor: "pointer", fontSize: "13px", padding: "2px 0px 2px 10px", listStyleType: "none", width: "100%"}}
                          >{event.title}</li>
                        ))}
                       </Modal>
                      }
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
                  <tr className='table-row'>
                    <th className="textLow"></th>
                    {weekdays.map((week)=>{
                      const weekDay = new Date(week)
                      return <th style={{height: "calc((20vh - 7 * 1px) / 7)", borderRight: "1px solid lightgray"}}>{weeks[weekDay.getDay()] + " " + weekDay.getDate() + "/" + (weekDay.getMonth() + 1)}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderTop: "1px solid lightgray", borderBottomStyle: "double", borderBottomWidth: "medium"}}>
                    <td style={{height: "calc((20vh - 7 * 1px) / 7)", textAlign: "end", padding: "5px", borderRight: "1px solid lightgray"}}>All day</td>
                    {weekdays.map((week)=>(
                      <td 
                      className="textLow"
                      key={week} 
                      onClick={()=>addWeekDay(week)} 
                      style={{height: "calc((20vh - 7 * 1px) / 7)", 
                              backgroundColor: (new Date(week).getDate() === date.getDate() && new Date(week).getMonth() === date.getMonth()) ? 'grey' : ""}}>
                                <p style={{
                                           textAlign: "center", 
                                           backgroundColor:"#3788d8", 
                                           borderRadius: "2px", 
                                           margin: "5px 3px 0px 3px", 
                                           cursor: "pointer", 
                                           fontSize: "10px", 
                                           }} 
                                    onClick={(e)=>{ e.stopPropagation();deleteEvent(new Date(week).getDate(), hasWeekDay(week)?.title)}}>{hasWeekDay(week)?.title}
                                </p>
                        </td>
                    ))}
                  </tr>
                  {timeSlotsForDay.map((time, timeIndex) => (
                  <tr key={timeIndex} className={timeIndex%2===0 ? "table-rowdotted" : "table-rowsolid"}>
                    <td className="textLow" style={{textAlign: "end", padding: "5px", visibility: timeIndex%2!==0 && "hidden"}}>{time}</td>
                    {weekdays.map((week)=>(
                      <td 
                      // className={timeIndex%2===0 ? "borderDotted" : undefined}
                      className="textLow"
                      key={week} 
                      onClick={()=>addWeekDay(week, time)} 
                      style={{height: "calc((20vh - 7 * 1px) / 7)", width: "calc((20vw - 7 * 1px) / 7)",
                              backgroundColor: (new Date(week).getDate() === date.getDate() && new Date(week).getMonth() === date.getMonth()) ? 'grey' : ""}}>
                                <p style={{
                                           textAlign: "center", 
                                           backgroundColor:"#3788d8", 
                                           borderRadius: "2px", 
                                           margin: "0px 5px 0px 5px", 
                                           paddingLeft:"2px",
                                           paddingRight:"2px",
                                           cursor: "pointer", 
                                           fontSize: "10px", 
                                           textTransform: "lowercase"}} 
                                    onClick={(e)=>{ e.stopPropagation();deleteEvent(new Date(week).getDate(), hasWeekandTime(week, time)?.title)}}>
                                      {hasWeekandTime(week, time) && time + "-" + timeSlotsForDay[timeIndex+1]  + " " + hasWeekandTime(week, time)?.title}
                                </p>
                        </td>
                    ))}
                  </tr>
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
                      <th style={{height: "calc((10vh - 7 * 1px) / 7)"}}>{weeks[getDay(date)]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderTop: "1px solid lightgray", borderBottomStyle: "double", borderBottomWidth: "medium"}}>
                    <td style={{textAlign: "end", padding: "5px", borderRight: "1px solid lightgray"}}>
                      All day
                    </td>
                  </tr>
                {timeSlotsForDay.map((time, timeIndex) => (
                  <>
                  <tr key={timeIndex} className={timeIndex%2===0 ? "table-rowdotted" : "table-rowsolid"}>
                    <td className='textLow' style={{visibility: timeIndex%2!==0 && "hidden", padding:"5px"}}>{time}</td>
                    <td 
                    onClick={()=>addEvent(date.getDate(), time)}
                    // className={timeIndex%2===0 ? "borderDotted" : undefined}
                    style={{backgroundColor: (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) ? "grey" : "", 
                            height: "calc((20vh - 7 * 1px) / 7)", 
                            width: "calc((20vw - 7 * 1px) / 7)"}}>
                          <p style={{
                                     width: "max-content",
                                     paddingLeft: "4px",
                                     paddingRight: "4px",
                                     textAlign: "center", 
                                     backgroundColor:"#3788d8", 
                                     borderRadius: "2px", 
                                     margin: "0px 5px 0px 5px", 
                                     fontSize: "10px", 
                                     cursor:"pointer",
                                    textTransform: "lowercase"}} 
                                    onClick={(e)=>{ e.stopPropagation();deleteEvent(date.getDate(), hasEventinDay(date.getDate(), time)[0]?.title)}}>
                                  {hasEventinDay(date.getDate(), time).length>0 ? time + "-" + timeSlotsForDay[timeIndex+1]  + " " + hasEventinDay(date.getDate(), time)[0]?.title : ""}
                          </p> 
                    </td>
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
