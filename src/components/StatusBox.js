import React from 'react'
import { Box, Icon, Typography } from '@mui/material';
import ProgressCircle from './ProgressCircle';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
const StatusBox = ({title, subtitle, icon, increase, progress}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box display='flex' justifyContent='space-between' gap='20px' minWidth={210} alignItems='center'>
        <Box display='flex' flexDirection='column' gap='5px'>
            {icon}
            <Typography variant='h4' sx={{fontWeight: "bold"}}>{title}</Typography>
            <Typography variant='h6' sx={{color: colors.greenAccent[500]}}>{subtitle}</Typography>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center' gap='15px' >
            <ProgressCircle progress={progress} size={40}></ProgressCircle>
            <Typography sx={{fontStyle: "italic", color: colors.greenAccent[500]}}>+{increase}%</Typography>
        </Box>
    </Box>
  )
}

export default StatusBox;
