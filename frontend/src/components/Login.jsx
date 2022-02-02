import React, { useState, useRef } from "react";
import Cookies from "universal-cookie";
// This will require to npm install axios
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, TextField, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

    // style for textfield/textvalidator
    "& .MuiTextField-root": {
      margin: 20,
      width: "300px",
    },

    // style for button
    "& .MuiButtonBase-root": {
      margin: 20,
    },
  },
});

// eslint-disable-next-line react/prop-types
const Login = ({ handleClose }) => {
  const classes = styles();
  const gridRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  // Sets Session
  const setSessionCookie = (session) => {
    const cookies = new Cookies();
    cookies.set("session", session, { path: "/" });
  };

  // This function will handle the submission.
  const onSubmit = (e) => {
    e.preventDefault();

    // Login Crdentials, will be used in post function
    const loginCredentials = { username, password };
    axios
      .post("http://localhost:5000/login", loginCredentials)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data);
        if (res.data) {
          setError("");
          setSessionCookie(res.data);
          // eslint-disable-next-line no-console
          console.log(new Cookies().get("session"));
          handleClose();
          history.push("home");
        } else {
          setError("Login Failed");
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    setUsername("");
    setPassword("");
  };

  // This following section will display the form that takes the input from the user.
  return (
    <ValidatorForm ref={gridRef} className={classes.root} onSubmit={onSubmit}>
      <TextValidator
        label='Email'
        variant='filled'
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
        validators={["required", "isEmail"]}
        errorMessages={["this field is required", "Email is not valid"]}
      />
      <TextField
        label='Password'
        variant='filled'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Alert severity='error'>{error}</Alert>}
      <div>
        <Button color='secondary' variant='contained' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='secondary' type='submit' variant='contained'>
          Login
        </Button>
      </div>
    </ValidatorForm>
  );
};

export default Login;
