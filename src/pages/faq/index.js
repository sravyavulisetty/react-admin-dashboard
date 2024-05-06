import React from 'react'
import Accordion from '../../components/Accordion';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
const index = () => {
  return (
    <Box m="20px">
    <Header title="FAQ" subtitle="Frequently Asked questions page"/>
    <Accordion title="Important Question" content="Please do check in the dashboard"></Accordion>
    <Accordion title="Important Question" content="Please do check in the dashboard"></Accordion>
    <Accordion title="Important Question" content="Please do check in the dashboard"></Accordion>
    </Box>
  )
}

export default index
