import React from "react";
import { Button } from "@material-ui/core";

const is_loggedIn = () => {};

function Homepage() {
  const handleLogOut = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}

export default Homepage;
