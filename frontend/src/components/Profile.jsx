import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import FileUpload from "./FileUpload";

const Profile = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [resume, setResume] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [resumePreview, setResumePreview] = useState("");
  const [submit, setSubmit] = useState(false);
  const resumeInput = createRef();
  const avatarInput = createRef();

  useEffect(() => {
    if (cookies.get("session") && userName.length === 0) {
      axios
        .get(`http://localhost:5000/profile/${cookies.get("session").username}`)
        .then((response) => {
          if (response.data) {
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setPhone(response.data.phone);
            setBio(response.data.bio);
            setAvatar(response.data.avatar);
            setResume(response.data.resume);
            if (response.data.avatar) {
              setAvatarPreview(
                `data:image/jpeg;base64,${response.data.avatar}`
              );
            }
            if (response.data.resume) {
              setResumePreview(
                `data:application/pdf;base64,${response.data.resume}`
              );
            }
          }
        });
      setUserName(cookies.get("session").username);
    }
  });

  const ClearAvatar = () => {
    setAvatar("");
    setAvatarPreview("");
    setAvatarError("");
    avatarInput.current.value = "";
  };

  const changeAvatar = (files) => {
    if (files && files.length !== 0) {
      if (files[0].type.split("/")[0] !== "image") {
        setAvatarError("File not Image");
      } else if ((files[0].size / 1024 / 1024).toFixed(4) > 10) {
        setAvatarError("File size > 10MB");
      } else {
        setAvatarPreview(URL.createObjectURL(files[0]));
        setAvatar(files[0]);
        setAvatarError("");
      }
    }
  };

  const ClearResume = () => {
    setResume("");
    setResumePreview("");
    setResumeError("");
    resumeInput.current.value = "";
  };

  const changeResume = (files) => {
    if (files && files.length !== 0) {
      if (files[0].type !== "application/pdf") {
        setResumeError("File not PDF");
      } else if ((files[0].size / 1024 / 1024).toFixed(4) > 10) {
        setResumeError("File size > 10MB");
      } else {
        setResumePreview(URL.createObjectURL(files[0]));
        setResumeError("");
        setResume(files[0]);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append("user_name", userName);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("bio", bio);
    data.append("phone", phone);
    data.append("resume", resume);
    data.append("avatar", avatar);
    axios
      .post(`http://localhost:5000/profile/update/${userName}`, data)
      .then(() => {
        setSubmit(true);
        history.push("/profile");
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
        }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Your Information
          </Typography>
          <Typography variant='p' component='p' gutterBottom>
            This will be used to populate both job applications within this site
            and for other sites if you use our extension.
          </Typography>
          <br />
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 0 }}>
            <Box display='flex' flexDirection='row'>
              <Grid container spacing={2} marginBottom={1}>
                <Grid item sm={6}>
                  <TextField
                    name='firstName'
                    required
                    fullWidth
                    autoFocus
                    id='firstName'
                    color='secondary'
                    label='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    id='lastName'
                    color='secondary'
                    label='Last Name'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    name='username'
                    disabled
                    fullWidth
                    autoFocus
                    color='secondary'
                    id='username'
                    label='Email'
                    value={userName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    inputProps={{ inputMode: "numeric", pattern: "^\\d{10}$" }}
                    id='phone'
                    color='secondary'
                    label='Phone Number'
                    helperText='9 digit number'
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box style={{ position: "relative" }}>
                {avatar && (
                  <IconButton
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 2,
                    }}
                    onClick={ClearAvatar}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                <input
                  accept='image/*'
                  id='upload-avator'
                  ref={avatarInput}
                  type='file'
                  hidden
                  onChange={(e) => changeAvatar(e.target.files)}
                />
                <label htmlFor='upload-avator'>
                  <Box
                    display='flex'
                    flexDirection='column'
                    padding={1}
                    alignItems='flex-end'
                  >
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      style={{ width: "160px", height: "160px" }}
                      component='span'
                    >
                      <Avatar
                        src={avatarPreview}
                        style={{ width: "128px", height: "128px" }}
                      >
                        <Typography
                          variant='h1'
                          component='h1'
                          gutterBottom
                          sx={{ m: 0 }}
                        >
                          {firstName[0] || ""}
                          {lastName[0] || ""}
                        </Typography>
                      </Avatar>
                    </IconButton>
                  </Box>
                </label>
                {avatarError && (
                  <Alert
                    position='absolute'
                    severity='error'
                    sx={{ bottom: 0 }}
                  >
                    {avatarError}
                  </Alert>
                )}
              </Box>
            </Box>
            <Box marginBottom={2}>
              <TextField
                color='secondary'
                id='outlined-multiline-static'
                label='Bio'
                multiline
                fullWidth
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Box>
            <Box>
              <FileUpload
                uploadHandler={changeResume}
                fileTypes={["PDF"]}
                maxSize={10}
              />
              {resume && (
                <Box id='Resume-uploaded' sx={{ flexDirection: "row" }}>
                  <Typography>
                    <Button
                      color='secondary'
                      download='resume.pdf'
                      href={resumePreview}
                    >
                      {resume.name || "Resume.pdf"}
                    </Button>
                    <IconButton onClick={ClearResume}>
                      <ClearIcon />
                    </IconButton>
                  </Typography>
                </Box>
              )}
              {resumeError && (
                <Box id='Resume-error'>
                  <Alert severity='error'>{resumeError}</Alert>
                </Box>
              )}
            </Box>
            <Button
              color='secondary'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
            >
              Save Information
            </Button>
            {submit && <Alert>Submit Successully!</Alert>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Profile;
