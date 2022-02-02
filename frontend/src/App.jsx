import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import { Container } from "@mui/material";
import Landing from "./components/Landing";
import CreatePosting from "./components/CreatePosting";
import Home from "./components/Home";
import HostFair from "./components/HostFair";
import Jobs from "./components/Jobs";
import ElevatorPitch from "./components/ElevatorPitch";
import Login from "./components/Login";
import ScheduleMeeting from "./components/ScheduleMeeting";
import ActiveFeature from "./components/ActiveFeature";
import Profile from "./components/Profile";
import ViewJobFair from "./components/ViewJobFair";
import ViewJobFairList from "./components/ViewJobFairList";
import JobFairPost from "./components/JobFairPost";
import ViewProfile from "./components/ViewProfile";

const App = () => (
  <Container maxWidth='false' disableGutters>
    {/* Landing page intro */}
    <Route exact path='/' component={Landing} />
    <Route exact path='/login' component={Login} />
    {/* App features for logged-in users */}
    <ActiveFeature path='/home'>
      <Home />
    </ActiveFeature>
    <ActiveFeature path='/profile'>
      <Profile />
    </ActiveFeature>
    <ActiveFeature path='/viewprofile'>
      <ViewProfile />
    </ActiveFeature>
    <ActiveFeature path='/jobs'>
      <Jobs />
    </ActiveFeature>
    <ActiveFeature path='/add-job'>
      <CreatePosting />
    </ActiveFeature>
    <ActiveFeature path='/host-fair'>
      <HostFair />
    </ActiveFeature>
    <ActiveFeature path='/elevatorpitch'>
      <ElevatorPitch />
    </ActiveFeature>
    <ActiveFeature path='/schedulemeeting'>
      <ScheduleMeeting />
    </ActiveFeature>
    <ActiveFeature path='/viewjobfair'>
      <ViewJobFair />
    </ActiveFeature>
    <ActiveFeature path='/viewjobfairlist'>
      <ViewJobFairList />
    </ActiveFeature>
    <ActiveFeature path='/jobfairpost'>
      <JobFairPost />
    </ActiveFeature>
  </Container>
);

export default App;
