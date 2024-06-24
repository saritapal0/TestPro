import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Popover, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import profileImageUrl from "../../assets/images/user.jpg";

const Header = ({ toggleMobileSidebar, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleMobileSidebar} // Toggle sidebar on MenuIcon click
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <div sx={{ flexGrow: 1 }} /> {/* Changed flexGrow value */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
         Dashboard
        </Typography>
        <div sx={{ flexGrow: 1 }} /> {/* Added flexGrow */}
        <IconButton color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar src={profileImageUrl} alt="Profile" />
        </IconButton>
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;