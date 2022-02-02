import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

    "& .MuiButtonBase-root": {
      margin: 20,
    },
  },
});

// eslint-disable-next-line react/prop-types
const Notification = ({ handleClose }) => {
  const classes = styles();
  const gridRef = useRef(null);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/meetings/")
      .then((response) => setMeetings(response.data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container ref={gridRef} className={classes.root}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {meetings &&
          meetings.map((meeting) => (
            <Alert severity='info'>
              <strong>Upcoming Meeting:</strong>
              <br />
              {meeting.attendees} - {meeting.date_scheduled}
              <Typography
                variant='h7'
                component='div'
                sx={{ fontWeight: "bold" }}
              >
                Meeting Link:
              </Typography>
              <Typography variant='h7' component='div'>
                <a href={meeting.meetingLink} rel='noreferrer'>
                  {meeting.meetingLink}
                </a>
              </Typography>
            </Alert>
          ))}
      </Stack>
      <div>
        <Button color='secondary' variant='contained' onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default Notification;
