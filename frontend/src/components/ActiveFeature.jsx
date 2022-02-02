import React from "react";
import { Box } from "@mui/material";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";

// Here, we display the parent container for each active feature
const ActiveFeature = (props) => (
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  <Route path={props.path}>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Navbar />
      {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
      {props.children}
    </Box>
  </Route>
);

export default ActiveFeature;
