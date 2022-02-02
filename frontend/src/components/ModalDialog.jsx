import React from "react";
import { Dialog } from "@mui/material";
import SignupForm from "./SignupForm";
import Login from "./Login";

// eslint-disable-next-line react/prop-types
const ModalDialog = ({ open, handleClose, email, setEmail, mode }) => (
  // props received from App.js
  <Dialog open={open} onClose={handleClose}>
    {mode === "Signup" && (
      <SignupForm handleClose={handleClose} email={email} setEmail={setEmail} />
    )}
    {mode === "Login" && <Login handleClose={handleClose} />}
  </Dialog>
);

export default ModalDialog;
