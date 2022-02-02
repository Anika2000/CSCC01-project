import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Icon,
  Avatar,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import NotificationDialog from "./NotificationDialog";
import HomeJobs from "./HomeJobs";

// Here, we display the home page
const Home = () => {
  const [users, setUsers] = useState([]);
  const [val, setVal] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (user) => {
    history.push({
      pathname: `/viewprofile`,
      state: { email: user.user_name },
    });
  };
  const onKeyDown = () => {
    let i = 2;
    i *= 4;
    return i;
  };
  const getUsers = (search) => {
    setVal(search);
    const list = [];
    let i;
    axios.get("http://localhost:5000/searchprofile/").then((response) => {
      if (response) {
        for (i = 0; i < response.data.length; i += 1) {
          const first = response.data[i].first_name;
          const last = response.data[i].last_name;
          const fullName = `${first} ${last}`;
          if (
            fullName.toLowerCase().includes(search.toLowerCase()) &&
            search.trim() !== ""
          ) {
            list.push(response.data[i]);
          }
        }
        setUsers(list);
      }
    });
  };
  /* eslint-disable react/jsx-props-no-spreading */
  /* eslint-disable jsx-a11y/anchor-is-valid */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

  return (
    <>
      <Container sx={{ my: 4 }}>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", ml: 35, my: 0, mb: 4 }}
        >
          <Autocomplete
            style={{ width: 500 }}
            noOptionsText='There is no user with that name'
            freeSolo
            autoComplete
            autoHighlight
            options={users}
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name}`.trim()
            }
            renderOption={(props, option) => (
              <li
                {...props}
                onKeyDown={onKeyDown}
                onClick={() => {
                  handlePageChange(option);
                }}
              >
                <Icon sx={{ mr: 3, flexShrink: 10 }}>
                  <Avatar
                    src={`data:image/jpeg;base64,${option.avatar}`}
                    style={{ width: "28px", height: "28px" }}
                  >
                    {option.first_name}
                    {option.last_name}
                  </Avatar>
                </Icon>
                {`${option.first_name} ${option.last_name}`.trim()}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                label='Search For People'
                id='input-with-icon-adornment'
                size='small'
                value={val}
                onChange={(e) => getUsers(e.target.value)}
              />
            )}
          />
        </Box>
        <Grid container justifyContent='flex-end'>
          <Button
            type='submit'
            variant='outlined'
            color='secondary'
            startIcon={<NotificationsIcon />}
            onClick={handleClickOpen}
          >
            Notifications
          </Button>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              Overview
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
              fullWidth
              label='Search For People'
              id='input-with-icon-adornment'
              size='small'
              value={val}
              onChange={(e) => getUsers(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              Notifications
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              Calendar
            </Paper>
          </Grid>
          {/* Relevant Job Postings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <HomeJobs />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <NotificationDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Home;
