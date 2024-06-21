
import React, { useState } from "react";
import { experimentalStyled, useMediaQuery, Container, Box, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from '../layouts/Header/Header';
import Sidebar from "../layouts/Sidebar/Sidebar";
import Footer from "../layouts/Footer/Footer";
import { TopbarHeight } from "../assets/global/Theme-variables";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));


  return (
    <MainWrapper>
      <CssBaseline />
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingLeft: lgUp ? "300px!important" : "",
            paddingRight: lgUp ? "50px!important" : "",
            overflow: "hidden",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
           <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
