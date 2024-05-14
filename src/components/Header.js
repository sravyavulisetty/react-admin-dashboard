import React from 'react'
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';
import { Typography, Box } from '@mui/material';
const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
        <Typography variant='h2' color={colors.grey[100]} fontWeight="bold" sx={{mb: '5px', lineHeight:"1.2"}}>{title}</Typography>
        <Typography variant='h6' fontWeight="regular" color={colors.greenAccent[400]}>{subtitle}</Typography>
    </Box>
  )
}

export default Header;