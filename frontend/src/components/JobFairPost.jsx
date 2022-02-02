import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import FileUpload from "./FileUpload";

const JobFairPost = () => {
  const history = useHistory();
  const location = useLocation();
  const [fair, setFair] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/fair/id/${location.state.fair}`)
      .then((res) => setFair(res.data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  });

  const changeImage = (files) => {
    if (files && files.length !== 0) {
      if (files[0].type.split("/")[0] !== "image") {
        setImageError("File not Image");
      } else if ((files[0].size / 1024 / 1024).toFixed(4) > 10) {
        setImageError("File size > 10MB");
      } else {
        setImage(files[0]);
        setImageError("");
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    const fairid = fair._id;
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    axios
      .post(`http://localhost:5000/fair/id/${fairid}/posts`, data)
      .then(() => {
        setSubmit(true);
        history.push({
          pathname: `/viewjobfair`,
          state: { fair: fairid },
        });
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Container
        maxWidth='sm'
        style={{
          marginLeft: "0px",
          marginRight: "0px",
          padding: "24px",
          minWidth: "600px",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            New Job Fair Post for <i>{fair.title}</i>
          </Typography>
          <br />
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 0, spacing: 2 }}>
            <TextField
              name='title'
              required
              fullWidth
              autoFocus
              id='title'
              color='secondary'
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              color='secondary'
              id='outlined-multiline-static'
              label='Description'
              required
              multiline
              fullWidth
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ my: 2 }}
            />
            <FileUpload
              uploadHandler={changeImage}
              fileTypes={["PNG", "JPG", "GIF", "SVG"]}
              maxSize={10}
            />
            <Button
              color='secondary'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
            >
              New Job Fair Post
            </Button>
            {imageError && (
              <Alert position='absolute' severity='error' sx={{ bottom: 0 }}>
                {imageError}
              </Alert>
            )}
            {submit && <Alert>Submit Successully!</Alert>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default JobFairPost;
