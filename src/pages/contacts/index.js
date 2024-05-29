import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = JSON.parse(localStorage.getItem("user-data"));
    const columns = [
        { field: "id", headerName: "ID", flex:1},
        {
          field: "firstName",
          headerName: "First Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "lastName",
          headerName: "Last Name",
          flex:1
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "contact",
          headerName: "Contact",
          flex: 1,
        },
        {
          field: "address",
          headerName: "Address",
          flex: 1
        },
      ];
    
      return (
        <Box m="20px">
          <Header title="CONTACTS" subtitle="List of Contacts" />
          <Box
            m="40px 0 0 0"
            height="65vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text" :{
                    color: `${colors.grey[100]} !important`
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
            }}
          >
            <DataGrid rows={data} columns={columns} slots={{toolbar: GridToolbar}} 
            initialState={{
            ...data.initialState,
            pagination: {paginationModel: { pageSize: 5 }},
            }}
            pageSizeOptions={[5, 10, 25]}/>
          </Box>
        </Box>
      );
    };

export default Contacts
