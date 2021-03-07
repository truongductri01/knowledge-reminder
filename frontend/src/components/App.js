import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./Homepage";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@material-ui/core";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [userKey, setUserKey] = useState();

  const sessionInfo = async () => {
    await fetch("/api/user_logged_in")
      .then((response) => response.json())
      .then((data) => {
        setUserKey(data.user_key);
        setLoggedIn(data.logged_in);
      });
  };

  useEffect(() => {
    sessionInfo();
  }, [loggedIn, userKey]);

  const renderHomepage = () => {
    if (loggedIn) {
      return <Homepage loggedIn={loggedIn} userKey={userKey} />;
    } else {
      return (
        <div>
          <h1>You need to Log In first</h1>
          <Button
            variant="contained"
            color="secondary"
            to="/log_in"
            component={Link}
          >
            Go to Login Page
          </Button>
        </div>
      );
    }
  };

  console.log({ loggedIn: loggedIn, userKey });
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/log_in">
            <Login />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/">{renderHomepage()} </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
