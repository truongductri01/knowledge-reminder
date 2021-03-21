import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import getCookie from "../../csrftoken";

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
  const login_clicked = async (e) => {
    e.preventDefault();
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
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
          console.log(response.statusText);
          setError("Invalid Username or Password");
        }
      }
    );
  };
  return (
    <div className="container">
      <h1>Log In</h1>
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
        {error && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Error!</strong> {error}
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setError()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <button
          className="btn btn-primary btn-block mb-4"
          onClick={login_clicked}
        >
          Log In
        </button>
      </form>

      <div className="justify-content-between">
        <Link to="/">
          <button type="button" className="btn btn-secondary col-4 float-left">
            Back to Homepage
          </button>
        </Link>
        <Link to="/sign_up">
          <button type="button" className="btn btn-success col-4 float-right">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
