import React from "react";
import { Box, Button, Alert, Typography } from "@mui/material";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import axios from "axios";

// Here, we display the landing page
const ExtensionHome = () => {
  const history = useHistory();
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState("");
  const Logout = () => {
    const cookies = new Cookies();
    axios.post("http://localhost:5000/logout", cookies.get("session"));
    cookies.remove("session");
    history.push("/index.html");
  };
  const session = new Cookies().get("session");

  const fillForm = (profile) => {
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="Phone"]'))){ 
          input.value= '${profile.phone}'; 
          input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));
        };
        if((input = document.querySelector('input[id*="phone"]'))){ input.value= '${profile.phone}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="phone"]'))){ input.value= '${profile.phone}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
      `,
    });
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="Email"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[type="email"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="email"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="username"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="email"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="username"]'))){ input.value= '${profile.user_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
      `,
    });
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="Bio"]'))){ input.value= '${profile.bio}';input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.getElementById('bio'))){ input.value = '${profile.bio}';input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="bio"]'))){ input.value = '${profile.bio}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
      `,
    });
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="First Name"]'))){ input.value= '${profile.first_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="firstName"]'))){ input.value = '${profile.first_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="fname"]'))){ input.value='${profile.first_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="firstName"]'))){ input.value = '${profile.first_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="fname"]'))){ input.value='${profile.first_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));}
      `,
    });
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="Last Name"]'))){ input.value= '${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="lastName"]'))){ input.value = '${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="lname"]'))){ input.value='${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="lastName"]'))){ input.value = '${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="lname"]'))){ input.value='${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
      `,
    });
    // eslint-disable-next-line no-undef
    chrome.tabs.executeScript(null, {
      code: `
        if((input = document.querySelector('input[label*="Full Name"]'))){ input.value= '${profile.first_name} ${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[id*="fullName"]'))){ input.value = '${profile.first_name} ${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
        if((input = document.querySelector('input[name*="fullName"]'))){ input.value = '${profile.first_name} ${profile.last_name}'; input.dispatchEvent(new CustomEvent('change', { 'bubbles': true }));};
      `,
    });
  };

  const autofillForm = () => {
    setError("");
    axios
      .get(`http://localhost:5000/profile/${session.username}`)
      .then((response) => {
        if (response.data) {
          const temp = response.data;
          if (response.data.avatar) {
            temp.avatar = `data:image/jpeg;base64,${response.data.avatar}`;
          }
          if (response.data.resume) {
            temp.resume = `data:application/pdf;base64,${response.data.resume}`;
          }
          fillForm(temp);
        } else {
          setError(
            `We can't get your information, please fill out your profile on our website`
          );
        }
      })
      .catch(() => {
        setError(`Unexpected error`);
      });
  };

  React.useEffect(() => {
    if (!session) {
      Logout();
    } else {
      setUserName(session.username);
      axios.post("http://localhost:5000/login/check", session).then((res) => {
        if (!res.data.sessionValid) {
          Logout();
        }
      });
    }
  }, [session, Logout]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        width: "256px",
      }}
    >
      <Typography
        variant='h6'
        color='primary'
        component='div'
        sx={{ flexGrow: 1, textAlign: "center", mb: 2, p: 2, ml: 4, mr: 4 }}
      >
        Welcome, {userName}
      </Typography>
      <Button
        color='secondary'
        variant='contained'
        onClick={autofillForm}
        sx={{
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
          mb: 2,
          ml: 4,
          mr: 4,
        }}
      >
        AutoFill application
      </Button>
      <Button
        variant='contained'
        onClick={Logout}
        sx={{
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
          ml: 4,
          mr: 4,
          mb: 2,
          padding: "auto",
        }}
      >
        Logout
      </Button>
      {error && <Alert severity='error'>{error}</Alert>}
    </Box>
  );
};
export default ExtensionHome;
