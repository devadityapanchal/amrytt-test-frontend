import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../components/sideNavBar";
import { Box, Toolbar } from "@mui/material";
import AppBarComponent, { drawerWidth } from "../components/AppBar";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarComponent />
      <SideNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
