import React from 'react'
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import { Box } from '@mui/material';
const Bar = () => {
  return (
    <Box m='20px'>
        <Header title='Bar Chart' subtitle='Simple Bar Chart'></Header>
        <BarChart barheight={500} barwidth={1000}/>
    </Box>
  )
}

export default Bar;

