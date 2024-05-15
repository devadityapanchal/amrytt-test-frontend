import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const SideNavBar: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard/">
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Insights" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/profiles">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNavBar;
