// src/scenes/contacts/index.jsx
    // Used to create the 'Contacts Information' page

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData"; 
import Header from "../../components/Header";

const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Defining the titles of the each column (this is based on the data we are getting from the 'mockData' file)
    const columns = [
        { field: "id", headerName: "ID" , flex: 0.5 }, 
        { field: "registrarId", headerName: "Registrar ID"},
        {
            field: "name", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell", 
        }, 
        {
            field: "age", 
            headerName: "Age", 
            type: "number",
            headerAlign: "left",
            align: "left",
        }, 
        {
            field: "phone", 
            headerName: "Phone Number", 
            flex: 1,
        }, 
        {
            field: "email", 
            headerName: "Email", 
            flex: 1,
        }, 
        {
            field: "address", 
            headerName: "Address", 
            flex: 1,
        }, 
        {
            field: "city", 
            headerName: "City", 
            flex: 1,
        },
        {
            field: "zipCode", 
            headerName: "ZipCode", 
            flex: 1,
        },   
    ];

    return (
        <Box m="20px">
            {/* Page Title */}
            <Header title="Contacts" subtitle="The list of contacts for future reference" />
            <Box
            m="40px 0 0 0"
            height="75vh"
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
                borderBottom: "none", 
                backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                },
            }}
            >
            <DataGrid
                rows={mockDataContacts}
                columns={columns}
                slots={{ toolbar: GridToolbar }}  // Changed from components to slots
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
            </Box>
        </Box>
    );
};

export default Contacts;    