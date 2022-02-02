import * as React from "react";
import { Box, Stack } from "@mui/material";

const JobPosting = () => (
  <Box
    sx={{
      p: 2,
      minWidth: 300,
    }}
  >
    <Stack
      direction='horizontal'
      sx={{ color: "text.primary", mb: 2, fontSize: 20 }}
    >
      <Box sx={{ fontWeight: "medium", mr: 2 }}>company_name</Box>
      <Box>Job Title</Box>
    </Stack>
    <Box sx={{ color: "text.secondary", ml: 3 }}>Job Description</Box>
  </Box>
);

export default JobPosting;
