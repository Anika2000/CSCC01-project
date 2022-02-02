import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import { Container } from "@mui/material";
import ExtensionLanding from "./components/ExtensionLanding";
import ExtensionHome from "./components/ExtensionHome";

const Popup = () => (
  <Container maxWidth='false' disableGutters>
    <Route exact path='/index.html' component={ExtensionLanding} />
    <Route path='/home' component={ExtensionHome} />
  </Container>
);

export default Popup;
