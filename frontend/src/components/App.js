import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./navBar/Header";
import Note from "./note/Note";
import Test from "./test/Test";

import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import reducer from "../redux/reducer";
import initialState from "../redux/initialState";
import logIn from "../redux/actions/logIn";
import logOut from "../redux/actions/logOut";

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const [canRender, setCanRender] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);

  const sessionInfo = async () => {
    await fetch("/api/user_logged_in")
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in) {
          dispatch(logIn(data.user_key));
        } else {
          dispatch(logOut());
        }
        setCanRender(true);
      });
  };

  useEffect(() => {
    sessionInfo();
  }, [loggedIn]);

  const renderHomepage = () => {
    if (loggedIn) {
      return <Homepage />;
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
          <Route path="/note">
            {canRender && (loggedIn ? <Note /> : <Redirect to="/log_in" />)}
          </Route>
          {/* <Route path="/test">{canRender && <Test />}</Route> */}
          <Route path="/">
            {
              canRender &&
                (loggedIn ? <Redirect to="/note" /> : <Redirect to="/log_in" />)
              // <div>{renderHomepage()}</div>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
