import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parse } from "date-fns";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function getDate(datestring) {
  return parse(
    datestring.substring(0, 32),
    "EEE MMM dd yyyyHH:mm:ss 'GMT'XX",
    new Date()
  );
}

// Here, we display the elevator pitch page
const ViewJobFairList = () => {
  const [fairs, setFairs] = useState([]);
  const [userType, setUserType] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const history = useHistory();
  const handlePageChange = (fair) => {
    if (userType === "job-seeker") {
      axios
        // eslint-disable-next-line no-underscore-dangle
        .put(`http://localhost:5000/fair/id/${fair._id}/attend/${userName}`)
        .then(() =>
          history.push({
            pathname: `/viewjobfair`,
            state: { fair },
          })
        );
    } else {
      history.push({
        pathname: `/viewjobfair`,
        state: { fair },
      });
    }
  };
  const session = new Cookies().get("session");

  useEffect(() => {
    setUserType(session.user_type);
    setUserName(session.username);
    if (userType === "employer" || userType === "job-seeker") {
      const fairsURL =
        userType === "employer"
          ? `http://localhost:5000/fairs/host/${userName}`
          : `http://localhost:5000/fairs/upcoming`;
      axios
        .get(fairsURL)
        .then((res) => setFairs(res.data))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  }, [session.user_type, session.username, userType, userName]);

  const deleteFair = (id) => {
    axios
      .delete(`http://localhost:5000/fair/id/${id}`)
      .then(() =>
        axios
          .get(`http://localhost:5000/fairs/host/${userName}`)
          .then((res) => setFairs(res.data))
      )
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  return (
    <Container sx={{ my: 4 }}>
      {userType === "job-seeker" && (
        <Typography variant='h3' align='left' gutterBottom>
          Upcoming Job Fairs
        </Typography>
      )}
      {userType === "employer" && (
        <Typography variant='h3' align='left' gutterBottom>
          Your Hosted Job Fairs
        </Typography>
      )}
      <ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 900: 2, 1350: 3 }}>
        <Masonry gutter='1em'>
          {fairs.map((fair) => (
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent style={{ flexGrow: 1, paddingBottom: 0 }}>
                <Typography gutterBottom variant='h6' component='h2'>
                  {fair.title}
                </Typography>
                <Typography gutterBottom variant='caption' component='h3'>
                  Hosted by {fair.host}
                </Typography>
                <Typography gutterBottom>{fair.description}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography>
                  <strong>Start:</strong>{" "}
                  {format(getDate(fair.start), "p, EEEE, PP")}
                </Typography>
                <Typography>
                  <strong>End:</strong>{" "}
                  {format(getDate(fair.end), "p, EEEE, PP")}
                </Typography>
                {userType === "job-seeker" && (
                  <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    disabled={
                      !(
                        getDate(fair.start) < new Date() &&
                        new Date() < getDate(fair.end)
                      )
                    }
                    sx={{ my: 2, width: "100%" }}
                    onClick={() => {
                      handlePageChange(fair);
                    }}
                  >
                    Attend
                  </Button>
                )}
                {userType === "employer" && (
                  <Grid container sx={{ p: 2 }} spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        sx={{ width: "100%" }}
                        onClick={() => {
                          handlePageChange(fair);
                        }}
                      >
                        View
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <Button
                        type='submit'
                        variant='outlined'
                        color='secondary'
                        sx={{ width: "100%" }}
                        onClick={() => {
                          // eslint-disable-next-line no-underscore-dangle
                          deleteFair(fair._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default ViewJobFairList;
