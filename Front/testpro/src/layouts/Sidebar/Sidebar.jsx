import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@mui/material";
import { SidebarWidth } from "../../assets/global/Theme-variables";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";


const Sidebar = (props) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));



  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: DashboardOutlinedIcon,
      href: "/dashboard",
    },
      ];
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [pathDirect]);

  const handleClick = (index, hasSubItems) => {
    if (lgUp) {
      props.onSidebarClose();
    }

    if (!hasSubItems) {
      props.onSidebarClose();
    } else if (open === index) {
      setOpen((prevOpen) => !prevOpen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/">
          <h1>Admin</h1>
        </Link>
        <IconButton onClick={props.onSidebarClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box>
        <List
          sx={{
            mt: 0,
          }}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <List component="li" disablePadding>
                <ListItem
                  key={item.id}
                  onClick={() => handleClick(index, !!item.subItems)}
                  button
                  component={NavLink}
                  to={item.href}
                  selected={pathDirect === item.href}
                  sx={{
                    mb: 1,
                    ...(pathDirect === item.href && {
                      color: "white",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ...(pathDirect === item.href && { color: "white" }),
                    }}
                  >
                    <item.icon width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.title}
                    {item.subItems && (
                      <IconButton
                        sx={{ position: 'absolute', right: 20, color: 'inherit', p: 0 }}
                      >
                        {open === index ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    )}
                  </ListItemText>
                </ListItem>
              </List>

              {item.subItems && open === index && (
                <List component="ul" disablePadding sx={{ paddingLeft: 2 }}>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      onClick={() => handleClick(index, false)}
                      button
                      component={NavLink}
                      to={subItem.href}
                      selected={pathDirect === subItem.href}
                      sx={{
                        mb: 1,
                        ...(pathDirect === subItem.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathDirect === subItem.href && { color: "white" }),
                        }}
                      >
                        <subItem.icon width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>{subItem.title}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;