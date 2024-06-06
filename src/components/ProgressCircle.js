import React from 'react'
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
const ProgressCircle = ({progress, size}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;
    return (
        <Box sx={{
                background: `radial-gradient(${colors.primary[400]} 50%, transparent 56%), conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg), ${colors.greenAccent[500]}`,
                  borderRadius: '50%',
                  width: `${size}px`,
                  height: `${size}px`
                }}>
        </Box>
  )
}

export default ProgressCircle
