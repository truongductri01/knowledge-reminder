import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./navBar/Header";
import Note from "./note/Note";
import Test from "./test/Test";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [userKey, setUserKey] = useState();
  const [canRender, setCanRender] = useState(false);

  const sessionInfo = async () => {
    await fetch("/api/user_logged_in")
      .then((response) => response.json())
      .then((data) => {
        setUserKey(data.user_key);
        setLoggedIn(data.logged_in);
        setCanRender(true);
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
          <Link to="log_in">
            <button className="btn btn-primary">Go to Log In Page</button>
          </Link>
        </div>
      );
    }
  };

  console.log({ loggedIn: loggedIn, userKey });
  return (
    <div className="container-fluid m-0 p-0 app">
      <Router>
        {loggedIn && <Header />}
        <Switch>
          <Route path="/log_in">
            <Login />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/note">{canRender && <Note userKey={userKey} />}</Route>
          <Route path="/test">{canRender && <Test />}</Route>
          <Route path="/">{canRender && <div>{renderHomepage()}</div>}</Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
