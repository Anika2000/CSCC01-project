import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import JobPosting from "./JobPosting";

const HomeJobs = () => (
  <>
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      Best Fits For You
    </Typography>
    <Stack
      direction='column'
      divider={<Divider orientation='horizontal' flexItem />}
      spacing={2}
    >
      <JobPosting />
      <JobPosting />
    </Stack>
  </>
);

export default HomeJobs;
