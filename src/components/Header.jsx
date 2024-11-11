// src/components/Header.jsx
    // Creates the header for the page

import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box>
        <Typography
            variant="h2" 
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ md: "5px" }}
        >
            {title}
        </Typography>
        <Typography variant="h7" color={colors.greenAccent[400]} >{subtitle}</Typography>
    </Box>
    
}

export default Header;