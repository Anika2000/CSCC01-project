import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Container } from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import Cookies from "universal-cookie";
import FileUpload from "./FileUpload";

// Here, we display the elevator pitch page
const ElevatorPitch = () => {
  const [elevatorPitch, setElevatorPitch] = useState(undefined);

  const session = new Cookies().get("session");

  const history = useHistory();

  const uploadHandler = (files) => {
    if (files.length !== 1) return;

    const file = files[0];
    // const { type } = file;

    setElevatorPitch(file);
  };

  const onReset = () => setElevatorPitch(undefined);
  const onSubmit = () => {
    if (!elevatorPitch) return;

    const data = new FormData();

    data.append("elevatorPitch", elevatorPitch);
    data.append("username", session.username);

    axios
      .post("http://localhost:5000/pitch/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => history.push("jobs"));
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        marginLeft: "0px",
        marginRight: "0px",
        padding: "24px",
      }}
    >
      <h2>Upload Elevator Pitch</h2>
      <FileUpload
        uploadHandler={uploadHandler}
        fileTypes={["MP4", "AVI"]}
        maxSize={5}
      />
      <ButtonGroup
        variant='outlined'
        color='secondary'
        aria-label='outlined button group'
      >
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onSubmit}>Save</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ElevatorPitch;
