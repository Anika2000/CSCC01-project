import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FixedSizeList } from "react-window";

/* eslint-disable react/prop-types */
const JobFairInfo = ({ fair }) => (
  <Box>
    <Typography gutterBottom variant='h3' component='h2'>
      {fair.title}
    </Typography>
    <Typography gutterBottom variant='caption' component='h3'>
      Hosted by {fair.host}
    </Typography>
    <Typography gutterBottom>{fair.description}</Typography>
  </Box>
);
/* eslint-enable react/prop-types */

// Here, we display the elevator pitch page
const ViewJobFair = () => {
  const location = useLocation();
  const [fair, setFair] = useState({});
  const [posts, setPosts] = useState([]);
  const [attendee, setAttendee] = useState({});
  const [userType, setUserType] = React.useState("");
  const session = new Cookies().get("session");
  const history = useHistory();
  const handlePageChange = (id) => {
    history.push({
      pathname: `/jobfairpost`,
      state: { fair: id },
    });
  };
  const deletePost = (post) => {
    axios
      .delete(`http://localhost:5000/fair/posts/${post}`)
      .then(() =>
        axios
          // eslint-disable-next-line no-underscore-dangle
          .get(`http://localhost:5000/fair/id/${location.state.fair._id}/posts`)
          .then((res) => setPosts(res.data))
      )
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };
  const goToProfile = (username) => {
    history.push({
      pathname: `/viewprofile`,
      state: { email: username },
    });
  };

  useEffect(() => {
    setUserType(session.user_type);
    // eslint-disable-next-line no-underscore-dangle
    const fairid = location.state.fair._id;
    axios
      .get(`http://localhost:5000/fair/id/${fairid}`)
      .then((res) => {
        setFair(res.data);
        // Get users who attended
        const obj = [];
        res.data.attendees.foreach((username) => {
          axios
            .get(`http://localhost:5000/profile/${username}`)
            .then((res2) => {
              obj[username] = res2.data;
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
        });
        setAttendee(obj);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/fair/id/${fairid}/posts`)
      .then((res) => setPosts(res.data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [session.user_type, location.state.fair]);

  const attendeesList = ({ index }) => {
    const username = fair.attendees[index];
    const name =
      // eslint-disable-next-line no-prototype-builtins
      attendee.hasOwnProperty(username) && attendee[username] !== null
        ? `${attendee[username].first_name} ${attendee[username].last_name}`
        : username;
    const avatar =
      // eslint-disable-next-line no-prototype-builtins
      attendee.hasOwnProperty(username) && attendee[username] !== null
        ? `data:image/jpeg;base64,${attendee[username].avatar}`
        : "";
    return (
      <ListItem key={username} component='div' disablePadding>
        <ListItemButton
          onClick={() => {
            goToProfile(username);
          }}
        >
          <ListItemAvatar>
            <Avatar src={avatar} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Container sx={{ my: 4 }}>
      <Card
        sx={{
          minWidth: "100%",
          p: 3,
          mb: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <JobFairInfo fair={fair} />
        {userType === "employer" &&
          // eslint-disable-next-line no-prototype-builtins
          fair.hasOwnProperty("attendees") &&
          fair.attendees.length > 0 && (
            <>
              <Divider sx={{ mt: 3 }} />
              <Typography sx={{ mt: 3 }} variant='h5' component='h2'>
                Attendees
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <FixedSizeList
                height={200}
                width={400}
                itemSize={46}
                itemCount={fair.attendees.length}
                overscanCount={2}
              >
                {attendeesList}
              </FixedSizeList>
            </>
          )}
        {userType === "employer" && (
          <Button
            type='submit'
            variant='outlined'
            color='secondary'
            sx={{ m: 3, width: "30%", alignSelf: "flex-end" }}
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              handlePageChange(fair._id);
            }}
          >
            Add New Job Fair Post
          </Button>
        )}
      </Card>
      <ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 900: 2, 1350: 3 }}>
        <Masonry gutter='1em'>
          {posts.length > 0 &&
            posts.map((post) => (
              <Card
                // eslint-disable-next-line no-underscore-dangle
                key={post._id}
                sx={{
                  minHeight: "450px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {post.image && (
                  <CardMedia
                    component='img'
                    image={`data:image/jpeg;base64,${post.image}`}
                    alt='random'
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {post.title}
                  </Typography>
                  <Typography>{post.description}</Typography>
                </CardContent>
                {userType === "employer" && (
                  <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    sx={{ width: "50%", mb: 2, mr: 2, alignSelf: "flex-end" }}
                    onClick={() => {
                      // eslint-disable-next-line no-underscore-dangle
                      deletePost(post._id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Card>
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default ViewJobFair;
