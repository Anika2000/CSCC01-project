import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Avatar, Typography, Box, Paper, Grid } from "@mui/material";

const ViewProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${location.state.email}`)
      .then((response) => {
        if (response) {
          const res = {
            email: response.data.user_name,
            name: `${response.data.first_name} ${response.data.last_name}`,
            phone: response.data.phone,
            bio: response.data.bio,
            avatar: response.data.avatar,
            resume: response.data.resume,
            hasPitch: response.data.hasPitch,
          };
          setUser(res);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  });

  return (
    <Box sx={{ my: 4, width: "80%" }}>
      <Typography
        variant='h3'
        component='h1'
        gutterBottom
        sx={{ m: 2, fontWeight: "bold" }}
      >
        {user.name}
      </Typography>

      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          src={`data:image/jpeg;base64,${user.avatar}`}
        />
        <Box sx={{ ml: 5, mt: 5 }}>
          <Typography variant='h6' component='h1' sx={{ m: 1 }}>
            Email: {user.email}
          </Typography>

          <Typography variant='h6' component='h1' sx={{ m: 1 }}>
            Phone: {user.phone}
          </Typography>
        </Box>
      </Grid>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          mt: 2,
          mr: 10,
        }}
      >
        <Typography
          variant='h6'
          component='h1'
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          About {user.name}
        </Typography>

        <Typography variant='h6' component='h1' sx={{ m: 2 }}>
          {user.bio}
        </Typography>
      </Paper>
      {/* Elevator Pitch */}
      {user.hasPitch && (
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            mt: 2,
            mr: 10,
          }}
        >
          <Typography
            variant='h5'
            component='h1'
            sx={{ my: 2, fontWeight: "bold" }}
          >
            Elevator Pitch
          </Typography>

          <div
            id='videoWrapper'
            style={{
              paddingTop: "56.75%",
              height: 0,
              width: "100%",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              id='pitchPlayer'
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              controls
              muted='muted'
            >
              <source
                src={`http://localhost:5000/pitch/watch/${location.state.email}`}
                type='video/mp4'
              />
            </video>
          </div>
        </Paper>
      )}
    </Box>
  );
};

export default ViewProfile;
