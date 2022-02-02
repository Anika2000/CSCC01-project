import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Popup from "./Popup";

if (window.location.href.includes("index.html")) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <CssBaseline />
        <Popup />
      </BrowserRouter>
    </React.StrictMode>,

    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </React.StrictMode>,

    document.getElementById("root")
  );
}
