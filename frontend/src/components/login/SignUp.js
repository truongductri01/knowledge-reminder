import React from "react";
import { useState } from "react";
import getCookie from "../../csrftoken";
import urls from "../../urls";

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

  const signup_clicked = (e) => {
    e.preventDefault();
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
    fetch(urls.sign_up, requestOptions).then((response) => {
      if (response.ok) {
        window.location.href = "/log_in";
      } else {
        alert("Error with the page");
      }
    });
  };
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form>
        <div class="form-group">
          <label for="email">User Name:</label>
          <input
            class="form-control"
            placeholder="Enter Username"
            onChange={username_change}
          />
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
              id="pwd"
              onChange={password_change}
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-block mb-4"
          onClick={signup_clicked}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
