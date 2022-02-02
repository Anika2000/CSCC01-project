import * as React from "react";
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import ViewListIcon from "@mui/icons-material/ViewList";
import BusinessCenter from "@mui/icons-material/BusinessCenter";
import { NavLink, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const drawerWidth = 280;

// Here, we display the dashboard drawer
const Navbar = () => {
  const history = useHistory();
  const [avatar, setAvatar] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const Logout = () => {
    const cookies = new Cookies();
    axios.post("http://localhost:5000/logout", cookies.get("session"));
    cookies.remove("session");
    history.push("");
  };
  const session = new Cookies().get("session");

  React.useEffect(() => {
    if (!session) {
      Logout();
    } else {
      setUserName(session.username);
      setUserType(session.user_type);
      axios.post("http://localhost:5000/login/check", session).then((res) => {
        if (!res.data.sessionValid) {
          Logout();
        }
      });
      axios
        .get(`http://localhost:5000/profile/${session.username}`)
        .then((response) => {
          if (response.data) {
            if (response.data.avatar) {
              setAvatar(`data:image/jpeg;base64,${response.data.avatar}`);
            } else {
              setAvatar("");
            }
          }
        });
    }
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box p={3}>
          <Typography variant='h5' component='h1'>
            Easy App-ly
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button key='Home' component={NavLink} to='/home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          {userType === "employer" && (
            <ListItem
              button
              key='Schedule Meetings'
              component={NavLink}
              to='/schedulemeeting'
            >
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary='Schedule Interviews' />
            </ListItem>
          )}
          {userType === "job-seeker" && (
            <ListItem
              button
              key='Elevator Pitch'
              component={NavLink}
              to='/elevatorpitch'
            >
              <ListItemIcon>
                <VideoCameraFrontIcon />
              </ListItemIcon>
              <ListItemText primary='Elevator Pitch' />
            </ListItem>
          )}
          {userType === "job-seeker" && (
            <ListItem
              button
              key='Available Jobs'
              component={NavLink}
              to='/jobs'
            >
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary='Available Jobs' />
            </ListItem>
          )}
          {userType === "employer" && (
            <ListItem button key='Post Job' component={NavLink} to='/add-job'>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary='Post Job' />
            </ListItem>
          )}
          {userType === "employer" && (
            <ListItem
              button
              key='Host Job Fair'
              component={NavLink}
              to='/host-fair'
            >
              <ListItemIcon>
                <BusinessCenter />
              </ListItemIcon>
              <ListItemText primary='Host Job Fair' />
            </ListItem>
          )}
          <ListItem
            button
            key='View Job Fairs'
            component={NavLink}
            to='/viewjobfairlist'
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='View Job Fairs' />
          </ListItem>
        </List>

        <List style={{ marginTop: `auto` }}>
          <ListItem
            component={NavLink}
            to='/profile'
            key='Profile'
            disablePadding
          >
            <ListItemButton>
              <Avatar src={avatar}>{userName[0]}</Avatar>
              <ListItemText sx={{ pl: 1 }} primary={userName.split("@")[0]} />
            </ListItemButton>
            <IconButton sx={{ mx: 2 }} onClick={Logout}>
              <LogoutIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
