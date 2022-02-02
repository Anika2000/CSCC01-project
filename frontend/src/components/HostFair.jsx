import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Box, Container, Grid, Stack, TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import Cookies from "universal-cookie";

const HostFair = () => {
  const cookies = new Cookies();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const newFair = {
      title,
      description,
      host: cookies.get("session").username,
      start: date.toDateString().concat(startTime.toTimeString()),
      end: date.toDateString().concat(endTime.toTimeString()),
    };

    axios
      .post("http://localhost:5000/fair/add", newFair)
      .then(() => history.push("/viewjobfairlist"));
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        marginLeft: "0px",
        marginRight: "0px",
        padding: "24px",
      }}
    >
      <h2>Host a Fair</h2>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete='off'
      >
        <Stack spacing={2}>
          <TextField
            label='Title'
            placeholder='Enter a title...'
            variant='outlined'
            color='secondary'
            fullWidth
            style={{
              width: "100%",
              marginLeft: "0",
              marginRight: "0",
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Description'
            placeholder='Enter a description...'
            multiline
            rows={8}
            color='secondary'
            fullWidth
            style={{
              width: "100%",
              marginLeft: "0",
              marginRight: "0",
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={0} columns={8}>
              <Grid item xs={5}>
                <StaticDatePicker
                  displayStaticWrapperAs='desktop'
                  openTo='day'
                  value={date}
                  color='secondary'
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <TextField {...params} color='secondary' />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Stack spacing={2}>
                  <TimePicker
                    label='Start Time'
                    value={startTime}
                    sx={{ margin: "0px" }}
                    onChange={(newStartTime) => setStartTime(newStartTime)}
                    renderInput={(params) => (
                      <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        color='secondary'
                        sx={{ maxWidth: "100%", margin: "0px" }}
                      />
                    )}
                  />
                  <TimePicker
                    label='End Time'
                    value={endTime}
                    sx={{ margin: "0px" }}
                    onChange={(newEndTime) => setEndTime(newEndTime)}
                    renderInput={(params) => (
                      <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        color='secondary'
                        sx={{ maxWidth: "100%", margin: "0px" }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Button onClick={onSubmit} variant='contained' color='secondary'>
            Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default HostFair;
