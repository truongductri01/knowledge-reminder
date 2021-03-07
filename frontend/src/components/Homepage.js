import React from "react";
import { Button } from "@material-ui/core";
import getCookie from "../csrftoken";

const is_loggedIn = () => {};

function Homepage(props) {
  const handleLogOut = () => {
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
    };
    fetch("/api/log_out", requestOptions).then((response) => {
      if (response.ok) {
        window.location.href = "/";
      }
    });
  };
  return (
    <div>
      <h1>This is Homepage</h1>
      <h2>User key: {props.userKey}</h2>
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}

export default Homepage;
