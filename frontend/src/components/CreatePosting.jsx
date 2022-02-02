import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Cookies from "universal-cookie";
import FileUpload from "./FileUpload";

const CreatePosting = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const session = new Cookies().get("session");
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const newPosting = {
      jobTitle,
      jobCompany,
      jobDescription,
      postBy: session.username,
    };

    axios.post("http://localhost:5000/job/add", newPosting).then(() => {
      history.push("jobs");
    });
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
      <h2>Job Information</h2>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete='off'
      >
        <Stack spacing={2}>
          <TextField
            id='outlined-basic'
            label='Job Title'
            placeholder='Enter the position title'
            variant='outlined'
            color='secondary'
            fullWidth
            style={{
              width: "100%",
              marginLeft: "0",
              marginRight: "0",
            }}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          {/* Placeholder to be removed once sessions are implemented. */}
          <TextField
            id='outlined-basic'
            label='Company'
            variant='outlined'
            color='secondary'
            fullWidth
            style={{
              width: "100%",
              marginLeft: "0",
              marginRight: "0",
            }}
            onChange={(e) => setJobCompany(e.target.value)}
          />
          <TextField
            id='outlined-textarea'
            label='Job Description'
            placeholder='Enter a description...'
            multiline
            rows={16}
            color='secondary'
            fullWidth
            style={{
              width: "100%",
              marginLeft: "0",
              marginRight: "0",
            }}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <h4>Add Images</h4>
          <FileUpload
            uploadHandler={() => {}}
            fileTypes={["PNG", "JPG", "GIF", "SVG"]}
            maxSize={2}
          />
          <Button onClick={onSubmit} variant='contained' color='secondary'>
            Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreatePosting;
