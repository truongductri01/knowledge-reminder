import React from "react";
import getCookie from "../csrftoken";
import Header from "./navBar/Header";

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
      <Header />
      <h1>This is Homepage</h1>
      <h2>User key: {props.userKey}</h2>
      <button className="btn btn-danger " onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
}

export default Homepage;
