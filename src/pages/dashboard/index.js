import React from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import {Typography, useTheme} from '@mui/material';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import StatusBox from '../../components/StatusBox';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import { tokens } from '../../theme';
import LineChart from '../../components/LineChart';
import { mockTransactions } from '../../data/mockData';
import ProgressCircle from '../../components/ProgressCircle';
import BarChart from '../../components/BarChart';
import GeographyChart from '../../components/GeographyChart';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
	const matches = useMediaQuery("(min-width: 769px)");
  return (
    <Box m='20px'>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
        <Button variant='contained' sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100]}}>
          <DownloadIcon sx={{mr: "10px"}}/>
          Download
        </Button>
      </Box>
      <Box display='grid' gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" mt={5}>
          <Box sx={{backgroundColor: colors.primary[400], px: "30px", py: '20px'}} gridColumn={matches ? "span 3" : "span 12"}>
            <StatusBox title='12,361' subtitle='Emails sent' icon={<EmailIcon fontSize='large' sx={{color: colors.greenAccent[600]}}/>} increase={14} progress='0.75'></StatusBox>
          </Box>
          <Box sx={{backgroundColor: colors.primary[400], px: "30px", py: '20px'}} gridColumn={matches ? "span 3" : "span 12"}>
            <StatusBox title='431,225' subtitle='Sales Obtained' icon={<PointOfSaleIcon fontSize='large' sx={{color: colors.greenAccent[600]}}/>} increase={21} progress='0.50'></StatusBox>
          </Box>
          <Box sx={{backgroundColor: colors.primary[400], px: "30px", py: '20px'}} gridColumn={matches ? "span 3" : "span 12"}>
            <StatusBox title='32,441' subtitle='New Clients' icon={<PersonAddIcon fontSize='large' sx={{color: colors.greenAccent[600]}}/>} increase={5} progress='0.25'></StatusBox>
          </Box>
          <Box sx={{backgroundColor: colors.primary[400],px: "30px", py: '20px'}} gridColumn={matches ? "span 3" : "span 12"}>
            <StatusBox title='1,325,134' subtitle='Traffic Inbound' icon={<TrafficIcon fontSize='large' sx={{color: colors.greenAccent[600]}}/>} increase={43} progress='0.75'></StatusBox>
          </Box>
          
          <Box gridColumn={matches ? "span 8" : "span 12"} gridRow="span 2" sx={{backgroundColor: colors.primary[400]}} >
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box px={3} py={1}>
                <Typography variant='h5'>Revenue Generated</Typography>
                <Typography variant='h5' sx={{color: colors.greenAccent[500], fontWeight: "bold"}}>$59,342,32</Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }}/>
                </IconButton>
              </Box>
            </Box>
            <Box width={700} height={300}>
              <LineChart linewidth={700} lineheight={250} cutoffheight={0} cutoffwidth={75}/>
            </Box>
          </Box>
          <Box sx={{overflowY: 'scroll'}} gridColumn={matches ? "span 4" : "span 12"} gridRow="span 2">
            <Box>
              <Typography variant='h6' sx={{backgroundColor: colors.primary[400], p: '15px'}}>Recent Transactions</Typography>
            </Box>
            {mockTransactions.map((transaction, index) => (
            <Box key={index} display='flex' justifyContent='space-between' alignItems='center' sx={{mt: '5px', backgroundColor: colors.primary[400], p: '15px'}} gap='57px'>
              <Box>
                <Typography sx={{color: colors.greenAccent[400]}} variant='h6'>{transaction.txId}</Typography>
                <Typography>{transaction.user}</Typography>
              </Box>
              <Typography sx={{textAlign: 'center'}}>{transaction.date}</Typography>
              <Button variant='contained' sx={{backgroundColor: colors.greenAccent[500]}}>{transaction.cost}</Button>
            </Box>
            ))}
          </Box>
          
          <Box sx={{backgroundColor: colors.primary[400]}} gridColumn={matches ? "span 4" : "span 12"} gridRow="span 2" p={2}>
            <Typography variant='h5' sx={{fontWeight: 'bold'}} >Campaign</Typography>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <ProgressCircle size={130} progress='0.75'/>
              <Typography sx={{color: colors.greenAccent[500], mt: '20px'}}>$48,352 revenue generated</Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box>

          <Box sx={{backgroundColor: colors.primary[400]}} gridColumn={matches ? "span 4" : "span 12"} gridRow="span 2" p={2}>
            <Typography>Sales Quantity</Typography>
            <Box height={250}>
              <BarChart barheight={200} barwidth={300}/>
            </Box>
          </Box>
          <Box sx={{backgroundColor: colors.primary[400]}} gridColumn={matches ? "span 4" : "span 12"} gridRow="span 2" p={2}>
            <Typography>Geography based traffic</Typography>
            <Box height={200}>
              <GeographyChart geowidth={350} geoheight={300} showScale={false} />
            </Box>
          </Box>
      </Box>
    </Box>
  )
}
export default Dashboard;
