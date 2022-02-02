import React from "react";
import { Dialog } from "@mui/material";
import Notification from "./Notification";

// eslint-disable-next-line react/prop-types
const NotificationDialog = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <Notification handleClose={handleClose} />
  </Dialog>
);

export default NotificationDialog;
