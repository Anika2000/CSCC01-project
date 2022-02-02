/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Button,
  Alert,
  Avatar,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import Cookies from "universal-cookie";

const ScheduleMeeting = () => {
  const [allJobs, setAllJobs] = React.useState([]);
  const [job, setJob] = React.useState(null);
  const [jobs, setJobs] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [meetingLink, setMeetingLink] = React.useState("");
  const [jobError, setJobError] = React.useState("");
  const [jobCompanies, setJobCompanies] = React.useState([]);
  const [company, setCompany] = React.useState(null);
  const [applicants, setApplicants] = React.useState([]);
  const [attendees, setAttendees] = React.useState([]);
  const [monthDay, setMonthDay] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [timeError, setTimeError] = React.useState("");
  const [attendeeError, setAttendeeError] = React.useState("");
  const session = new Cookies().get("session");
  const history = useHistory();

  const changeCompany = (event, value) => {
    setCompany(value);
    setJob(null);
    setAttendees([]);
    setApplicants([]);
    const jobdata = [];
    allJobs.forEach((curr) => {
      if (curr.jobCompany === value) {
        jobdata.push(curr);
      }
    });
    setJobs(jobdata);
  };

  const changeJob = (event, value) => {
    setJob(value);
    setAttendees([]);
    setApplicants([]);
    const applyData = [];
    if (value && value.jobApplicants) {
      value.jobApplicants.forEach((el) => {
        if (el) {
          axios.get(`http://localhost:5000/profile/${el}`).then((response) => {
            if (response.data) {
              applyData.push(response.data);
            }
          });
        }
      });
    }
    setApplicants(applyData);
  };

  // let submitMessage = false;
  const onSubmit = (e) => {
    e.preventDefault();
    let validMeeting = true;
    let date = "";
    if (!monthDay || !startTime || !endTime) {
      setTimeError("Please select Date and Time");
      validMeeting = false;
    } else {
      date = monthDay.toDateString().concat(` ${startTime.toTimeString()}`);
      if (Date.parse(date) <= Date.parse(new Date())) {
        setTimeError("Start Time must be later than current time");
        validMeeting = false;
      } else if (Date.parse(startTime) >= Date.parse(endTime)) {
        setTimeError("Start Time must be earlier than End Time");
        validMeeting = false;
      } else {
        setTimeError("");
      }
    }
    if (!attendees || attendees.length === 0) {
      validMeeting = false;
      setAttendeeError("Must select at least one applicant");
    } else {
      setAttendeeError("");
    }
    if (!job) {
      validMeeting = false;
      setJobError("Must select a job");
    } else {
      setJobError("");
    }
    if (validMeeting) {
      const users = [];
      attendees.forEach((attendee) => users.push(attendee.user_name));
      const newMeeting = {
        users,
        date,
        title,
        meetingLink,
        username: session.username,
        // eslint-disable-next-line no-underscore-dangle
        jobId: job._id,
        hostBy: session.username,
      };
      axios.post("http://localhost:5000/meetings/add", newMeeting).then(() => {
        history.push("home");
        // submitMessage = true;
      });
    }
  };

  React.useEffect(() => {
    if (!jobs || jobs.length === 0) {
      axios
        .post("http://localhost:5000/job/find", { postBy: session.username })
        .then((response) => {
          setAllJobs(response.data);
          const data = [];
          response.data.forEach((element) => {
            if (!data.includes(element.jobCompany)) {
              data.push(element.jobCompany);
            }
          });
          setJobCompanies(data);
        });
    }
  }, []);

  return (
    <Box>
      <Box sx={{ paddingTop: 8, paddingBottom: 2 }}>
        <Typography variant='h5' component='h1' sx={{ fontWeight: "bold" }}>
          Schedule Interviews
        </Typography>
      </Box>
      <Grid item sm={12} sx={{ paddingBottom: 2 }}>
        <Typography
          sx={{ paddingBottom: 1 }}
          variant='h7'
          component='div'
          color='text.secondary'
        >
          Select a Job
        </Typography>
        <Grid container spacing={2} minWidth='50%'>
          <Grid item sm={5}>
            <Autocomplete
              options={jobCompanies}
              noOptionsText={`You haven't created a job yet`}
              getOptionLabel={(option) => option}
              value={company}
              onChange={(event, value) => changeCompany(event, value)}
              renderInput={(params) => (
                <TextField {...params} label='Company' />
              )}
            />
          </Grid>
          <Grid item sm={5}>
            <Autocomplete
              options={jobs}
              noOptionsText={`You haven't created a job yet`}
              getOptionLabel={(option) => option.jobTitle}
              value={job}
              onChange={(event, value) => changeJob(event, value)}
              renderInput={(params) => <TextField {...params} label='Job' />}
            />
          </Grid>
        </Grid>
        <Grid sm={8}>
          {jobError && (
            <Alert severity='error' sx={{ minWidth: "50%" }}>
              {jobError}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid item sm={12} sx={{ paddingBottom: 2 }}>
        <Typography
          sx={{ paddingBottom: 1 }}
          variant='h7'
          component='div'
          color='text.secondary'
        >
          Select an Applicant
        </Typography>
        <FormControl sx={{ minWidth: "83%" }}>
          <Autocomplete
            multiple
            options={applicants}
            noOptionsText={`There isn't an applicant yet`}
            getOptionLabel={(option) => option.user_name}
            filterSelectedOptions
            value={attendees}
            onChange={(event, values) => setAttendees(values)}
            renderOption={(props, option) => (
              <li {...props}>
                <Box display='flex'>
                  <Avatar
                    src={`data:image/jpeg;base64,${option.avatar}`}
                    style={{
                      width: "28px",
                      height: "28px",
                      marginRight: "20px",
                    }}
                  >
                    {option.first_name[0]}
                    {option.last_name[0]}
                  </Avatar>
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {option.user_name}
                    <br />
                    <span>
                      {option.first_name} {option.last_name}
                    </span>
                  </Box>
                </Box>
              </li>
            )}
            renderInput={(params) => <TextField {...params} label='Users' />}
          />
        </FormControl>
        {attendeeError && (
          <Alert severity='error' sx={{ width: "83%" }}>
            {attendeeError}
          </Alert>
        )}
      </Grid>
      <Grid item sm={15} sx={{ paddingBottom: 2 }}>
        <Typography
          sx={{ paddingBottom: 1 }}
          variant='h7'
          component='div'
          color='text.secondary'
        >
          Enter Meeting Title
        </Typography>
        <FormControl sx={{ minWidth: "83%" }}>
          <TextField
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id='outlined-basic'
            label='Title'
            variant='outlined'
          />
        </FormControl>
      </Grid>
      <Grid item sm={15} sx={{ paddingBottom: 2 }}>
        <Typography
          sx={{ paddingBottom: 1 }}
          variant='h7'
          component='div'
          color='text.secondary'
        >
          Enter Meeting Link
        </Typography>
        <FormControl sx={{ minWidth: "83%" }}>
          <TextField
            required
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            id='outlined-basic'
            label='Meeting Link'
            variant='outlined'
          />
        </FormControl>
      </Grid>
      <Grid item sm={15}>
        <Typography variant='h7' component='div' color='text.secondary'>
          Select the Date and Time
        </Typography>
        {timeError && (
          <Alert severity='error' sx={{ width: "83%" }}>
            {timeError}
          </Alert>
        )}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container>
            <Grid item sm={0}>
              <StaticDatePicker
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={monthDay}
                onChange={(newDate) => {
                  setMonthDay(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid container sm={7} spacing={1} paddingTop={3}>
              <Grid item height='fit-content'>
                <TimePicker
                  label='Enter Start Time'
                  value={startTime}
                  onChange={(newStartTime) => {
                    setStartTime(newStartTime);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ marginBottom: 3 }} {...params} />
                  )}
                />
                <TimePicker
                  label='Enter End Time'
                  value={endTime}
                  onChange={(newEndTime) => {
                    setEndTime(newEndTime);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Grid>

      <Grid item sm={12}>
        <Button
          color='secondary'
          variant='contained'
          sx={{ mt: 0, marginBottom: 5, minWidth: "83%" }}
          // eslint-disable-next-line react/no-this-in-sfc
          onClick={onSubmit}
        >
          Schedule Meeting
        </Button>
        {/* {submitMessage && <Alert>Submit Successully!</Alert>} */}
      </Grid>
    </Box>
  );
};

export default ScheduleMeeting;
