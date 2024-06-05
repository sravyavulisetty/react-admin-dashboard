import React from 'react'
import LineChart from '../../components/LineChart';
import Header from '../../components/Header';
import { Box } from '@mui/material';
const Line = () => {
  return (
    <Box m='20px'>
      <Header title='Line Chart' subtitle='Simple Line Chart'></Header>
      <Box mt={8}>
        <LineChart linewidth={1000} lineheight={500} cutoffheight={50} cutoffwidth={100}/>
      </Box>
    </Box>
  )
}

export default Line;


