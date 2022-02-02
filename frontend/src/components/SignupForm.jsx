import React, { useState, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// Create the style for the form
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

  // style for radio buttons (Job Seeker & Employer)
  radio: {
    alignItems: "left",
    justifyContent: "left",
  },
  p: {
    width: "250px",
    textAlign: "center",
    alignContent: "center",
    color: "red",
  },
});

// the actual form
// eslint-disable-next-line react/prop-types
const SignupForm = ({ handleClose, email, setEmail }) => {
  // get the styles
  const classes = styles();
  const gridRef = useRef(null);

  // create state variables for each input
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [successfulsigup, setSignupSuccess] = useState(false);

  const closeSignupSuccess = () => {
    setSignupSuccess(false);
    handleClose();
  };

  // when user clicks submit, validate inputs and post or give appropriate error messages.
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      UserType: type,
    };

    if (
      newUser.password === conPass &&
      newUser.password.length >= 7 &&
      /\d/.test(password) &&
      /[a-zA-Z]/.test(password) &&
      // eslint-disable-next-line react/prop-types
      email.length !== 0 &&
      /[@]/.test(email) &&
      (type === "employer" || type === "job-seeker")
    ) {
      // add the user to the db
      axios
        .post("http://localhost:5000/user/add", {
          user_email: newUser.email,
          user_password: newUser.password,
          user_type: newUser.UserType,
        })
        // eslint-disable-next-line no-console
        .then((res) => {
          if (res.data === "User cannot be added") {
            setSignupSuccess(false);
            setError(
              "Email already exists, please sign in or try a different email."
            );
          } else {
            setSignupSuccess(true);
            axios.post(`http://localhost:5000/profile/create`, {
              email,
            });
          }
        });
    } else if (password !== conPass) {
      setError("Passwords must match");
      // no numbers                 no letters              too short
    } else if (
      !(/\d/.test(password) && /[a-zA-Z]/.test(password)) ||
      newUser.password.length < 7
    ) {
      setError(
        "Passwords must have at least one number, one letter, and be at least 7 characters long"
      );
    } else if (type.length < 3) {
      setError("Please select account type");
    }
  };

  // the style of the form- form that user sees
  return (
    <ValidatorForm
      ref={gridRef}
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <TextValidator
        label='Email'
        variant='filled'
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
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
        helperText='Passwords need to match, have at least one number, one letter, and be at least 7 characters long'
      />
      <TextField
        label='Confirm Password'
        variant='filled'
        type='password'
        required
        value={conPass}
        onChange={(e) => setConPass(e.target.value)}
        helperText='Passwords need to match'
      />
      <FormControl>
        <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
          <Grid container>
            <FormControlLabel
              className={classes.radio}
              value='job-seeker'
              control={<Radio />}
              label='Job Seeker'
            />
            <FormControlLabel
              className={classes.radio}
              value='employer'
              control={<Radio />}
              label='Employer'
            />
          </Grid>
        </RadioGroup>
      </FormControl>
      <p className={classes.p}>{error}</p>
      <div>
        <Button color='secondary' variant='contained' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='secondary' type='submit' variant='contained'>
          Signup
        </Button>
      </div>
      <Snackbar
        open={successfulsigup}
        autoHideDuration={6000}
        onClose={closeSignupSuccess}
      >
        <Alert severity='success'>Signup Success!</Alert>
      </Snackbar>
    </ValidatorForm>
  );
};

export default SignupForm;
