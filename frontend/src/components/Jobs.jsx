import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "universal-cookie";
/* eslint-disable react/prop-types */

function PullJobInfo({ job, apply }) {
  return (
    <Card sx={{ minWidth: "100%", marginTop: "16px" }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item sm={10}>
            <Typography variant='h5' component='div'>
              {job.jobTitle}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {job.jobCompany}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            {job.applied ? (
              <Button variant='outlined' color='secondary'>
                Applied
              </Button>
            ) : (
              <Button
                variant='contained'
                color='secondary'
                onClick={() => apply(job)}
              >
                Easy Apply
              </Button>
            )}
          </Grid>
        </Grid>
        <Typography variant='body2'>{job.jobDescription}</Typography>
      </CardContent>
    </Card>
  );
}

// Here, we display the jobs page
const Jobs = () => {
  const cookies = new Cookies();

  const user = cookies.get("session").username;

  const [jobs, setJobs] = useState([]);
  const [val, setVal] = useState("");

  const pullJobs = () => {
    let i;
    const list = [];
    axios
      .get("http://localhost:5000/jobs/")
      .then((response) => {
        if (response) {
          response.data.forEach((job) => {
            // eslint-disable-next-line no-param-reassign
            job.applied = job.jobApplicants.indexOf(user) > -1;
          });
          setJobs(response.data);
          if (val === "") {
            setJobs(response.data);
          } else {
            for (i = 0; i < response.data.length; i += 1) {
              const searchStr = `${response.data[i].jobName} ${response.data[i].jobCompany}`;
              if (
                searchStr.toLowerCase().includes(val.toLowerCase()) &&
                val.trim() !== ""
              ) {
                list.push(response.data[i]);
              }
            }
            setJobs(list);
          }
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  useEffect(() => pullJobs());

  const apply = (job) => {
    axios
      // eslint-disable-next-line no-underscore-dangle
      .post(`http://localhost:5000/job/${job._id}/apply`, { user })
      .then(() => pullJobs())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={2} md={2} lg={2}>
          <Typography variant='h5' align='left' gutterBottom>
            Available Jobs
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Stack direction='row' spacing={2}>
            <Chip label={jobs.length} />
          </Stack>
        </Grid>
        <Grid item xs={0} md={0} lg={0}>
          <TextField
            label='Search for jobs/companies'
            id='outlined-size-small'
            size='small'
            onChange={(e) => setVal(e.target.value)}
          />
        </Grid>
        <Grid item xs={20} md={40} lg={60}>
          {jobs.map((job) => (
            <PullJobInfo job={job} user={user} apply={apply} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
