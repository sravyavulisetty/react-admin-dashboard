import React from 'react'
import Header from '../../components/Header';
import { Box } from '@mui/material';
import GeographyChart from '../../components/GeographyChart';
const Geography = () => {
  return (
    <Box m='20px'>
      <Header title='Geography Chart' subtitle='Simple Geography Chart'></Header>
      <Box mt={10}>
        <GeographyChart geowidth={900} geoheight={600} showScale={true} />
      </Box> 
    </Box>
  )
}

export default Geography;

