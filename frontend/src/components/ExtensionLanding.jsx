import React from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import Login from "./Login";

// Here, we display the landing page
const ExtensionLanding = () => {
  const history = useHistory();
  const session = new Cookies().get("session");
  const handleClose = () => {};
  React.useEffect(() => {
    if (session) {
      history.push("home");
    }
  });
  return (
    <Box>
      <Typography
        variant='h6'
        color='primary'
        component='div'
        sx={{
          mt: 2,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        Easy App-ly
      </Typography>
      <Login handleClose={handleClose} />
    </Box>
  );
};
export default ExtensionLanding;
