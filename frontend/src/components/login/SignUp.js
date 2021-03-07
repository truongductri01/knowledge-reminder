import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import getCookie from "../../csrftoken";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const csrftoken = getCookie();
  const username_change = (e) => {
    setUsername(e.target.value);
  };
  const password_change = (e) => {
    setPassword(e.target.value);
  };

  const signup_clicked = () => {
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    };
    fetch("http://127.0.0.1:8000/api/sign_up", requestOptions).then(
      (response) => {
        if (response.ok) {
          window.location.href = "/log_in";
        } else {
          alert("Error with the page");
        }
      }
    );
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
