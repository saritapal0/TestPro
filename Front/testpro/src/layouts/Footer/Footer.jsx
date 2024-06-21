import React from 'react'
import {
    Box,
    Link,
    Typography,
    
  } from "@mui/material";
const Footer = () => {
    return ( 
        <Box sx={{p:6, textAlign:'center'}}>
            <Typography>© 2024 <Link href="https://www.wrappixel.com">Admin Panel</Link> </Typography>
        </Box>
     );
}
 
export default Footer;