import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

function Homepage() {
  const userKey = useSelector((state) => state.userKey);

  return (
    <div className="container-fluid m-0 p-0 homepage">
      <h1>Testing</h1>
      <p>User key: {userKey}</p>
    </div>
  );
}

export default Homepage;
