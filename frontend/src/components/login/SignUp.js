import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const username_change = (e) => {
    setUsername(e.target.value);
  };
  const password_change = (e) => {
    setPassword(e.target.value);
  };

  const signup_clicked = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    };
    fetch("api/sign_up", requestOptions)
      .then((response) => response)
      .then((data) => console.log(data));
  };
  return (
    <Grid className="signup" container spacing={2}>
      <Grid item xs={12} align="center">
        <h1>Sign up</h1>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          id="outlined-basic"
          label="User name"
          variant="outlined"
          value={username}
          onChange={username_change}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={password_change}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={signup_clicked}>
          Sign Up
        </Button>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
}

export default SignUp;
