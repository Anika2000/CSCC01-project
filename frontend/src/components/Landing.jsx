import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import ModalDialog from "./ModalDialog";
import LandingImage from "./landing.png";

// eslint-disable-next-line react/prop-types
const LandingFeature = ({ featurename, featuredescription }) => (
  <>
    <Typography variant='h4' component='p'>
      {featurename}
    </Typography>
    <Typography
      variant='h5'
      color='text.secondary'
      component='p'
      sx={{ pb: 2 }}
    >
      {featuredescription}
    </Typography>
  </>
);

// Here, we display the landing page
const Landing = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("");
  const history = useHistory();
  const session = new Cookies().get("session");
  // function to handle modal open
  const handleOpen = (status) => {
    setMode(status);
    setOpen(true);
  };

  const handleClose = () => {
    setMode("");
    setOpen(false);
    // go to sign-in page
  };
  React.useEffect(() => {
    if (session) {
      history.push("home");
    }
  });

  return (
    <Box>
      {/* Landing Page Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar style={{ padding: "0px 175.75px" }}>
            <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
              Easy App-ly
            </Typography>
            <Button onClick={() => handleOpen("Login")} color='inherit'>
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleOpen("Signup")}
            >
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={0}>
        <Grid item md={12} lg={6}>
          <Container
            disableGutters
            maxWidth='sm'
            component='main'
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component='h1'
              variant='h1'
              color='primary'
              align='left'
              gutterBottom
            >
              Easy App-ly
            </Typography>
            <Typography
              variant='h5'
              color='text.secondary'
              component='p'
              gutterBottom
            >
              Whether you’re an employer or a job seeker, find your match faster
              and more efficiently, with elevator pitches, virtual job fairs,
              and a faster application process with Easy App-ly.
            </Typography>
            <Grid container sx={{ justifyContent: "space-between", my: 3 }}>
              <TextField
                size='small'
                label='Enter your email'
                variant='filled'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ flexGrow: 2, mr: 3 }}
              />
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                onClick={() => handleOpen("Signup")}
              >
                Get Started
              </Button>
            </Grid>
          </Container>
          <Divider />
          <Container
            disableGutters
            maxWidth='sm'
            component='main'
            sx={{ pt: 8, pb: 6 }}
          >
            <Typography
              component='h1'
              variant='h2'
              color='text.primary'
              gutterBottom
            >
              Features for Seekers
            </Typography>
            <LandingFeature
              featurename='Elevator Pitch'
              featuredescription='
                            Show employers your most valuable skills as well
                            as your professional personality in a short summary video.'
            />
            <LandingFeature
              featurename='Application Autofill'
              featuredescription='
                            Provide your information, resume, and other documents
                            and Easy App-ly will populate these fields to speed up the process'
            />
          </Container>
          <Divider />
          <Container
            disableGutters
            maxWidth='sm'
            component='main'
            sx={{ pt: 8, pb: 6 }}
          >
            <Typography
              component='h1'
              variant='h2'
              color='text.primary'
              gutterBottom
            >
              Features for Employers
            </Typography>
            <LandingFeature
              featurename='Virtual Job Fairs'
              featuredescription='
                            Host virtual job fairs to increase the engagement
                            and visibility of your offerings to wider range of talent.'
            />
            <LandingFeature
              featurename='Schedule Meetings'
              featuredescription='
                            Meet with your candidates and set up schedules with them virtually
                            to connect with global opportunities.'
            />
          </Container>
        </Grid>
        <Grid item md={0} lg={6}>
          <Box
            style={{
              backgroundImage: `url(${LandingImage})`,
              backgroundSize: `cover`,
              height: "100%",
            }}
          />
        </Grid>
      </Grid>

      <ModalDialog
        open={open}
        mode={mode}
        handleClose={handleClose}
        email={email}
        setEmail={setEmail}
      />
    </Box>
  );
};
export default Landing;
