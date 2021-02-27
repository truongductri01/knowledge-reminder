import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const username_change = (e) => {
    setUsername(e.target.value);
  };
  const password_change = (e) => {
    setPassword(e.target.value);
  };
  const login_clicked = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    };
    fetch("http://127.0.0.1:8000/api/log_in", requestOptions).then(
      (response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          setError("Invalid Username or Password");
        }
      }
    );
  };
  return (
    <Grid className="signup" container align="center" spacing={2}>
      <Grid item xs={12} align="center">
        <h1>Log In</h1>
      </Grid>
      <Grid container xs={8} spacing={2}>
        <Grid item xs={12} align="center">
          <TextField
            id="outlined-basic"
            label="User name"
            variant="outlined"
            value={username}
            onChange={username_change}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={password_change}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid item xs={4} align="center" style={{ padding: "0" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={login_clicked}
          style={{ height: "100%", width: "90%" }}
        >
          Log In
        </Button>
      </Grid>

      {error != null && (
        <Grid item xs={12} align="center">
          <Alert severity="error" onClose={() => setError()}>
            {error}
          </Alert>
        </Grid>
      )}

      <Grid item xs={6} spacing={5} align="center" justify="center">
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          to="/"
          component={Link}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={6} align="center">
        <Button
          variant="contained"
          color="default"
          fullWidth
          to="/sign_up"
          component={Link}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
