import React, { useState } from "react";
import "./header.css";
import getCookie from "../../csrftoken.js";
import { Link } from "react-router-dom";

function Header() {
  const [isHome, setIsHome] = useState(true);
  const [isNote, setIsNote] = useState(false);
  const [isTest, setIsTest] = useState(false);

  const handleHomeClick = () => {
    setIsHome(true);
    setIsNote(false);
    setIsTest(false);
  };
  const handleNoteClick = () => {
    setIsHome(false);
    setIsNote(true);
    setIsTest(false);
  };
  const handleTestClick = () => {
    setIsHome(false);
    setIsNote(false);
    setIsTest(true);
  };

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
    <nav class="navbar navbar-expand-sm navbar-dark shadow p-0 pt-2 pb-2 mb-1 sticky-top rounded">
      <div className="navbar-brand col-1 m-0">
        <Link to="/">
          {" "}
          <h1 className="text-center align-middle">K</h1>
        </Link>
      </div>
      <form class="col-3 d-flex align-items-center">
        <input class="form-control" type="text" placeholder="Search" />
      </form>

      {/* Div nav */}
      <ul
        class="nav nav-pills col-6 d-flex justify-content-center"
        id="pills-tab"
        role="tablist"
      >
        <li class="nav-item">
          <Link to="/" onClick={handleHomeClick}>
            <a
              class={`nav-link ${isHome && "active"}`}
              data-toggle="pill"
              role="tab"
              aria-selected="true"
            >
              Home
            </a>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/note" onClick={handleNoteClick}>
            <a
              class={`nav-link ${isNote && "active"}`}
              data-toggle="pill"
              role="tab"
              aria-selected="false"
            >
              Notes
            </a>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/test" onClick={handleTestClick}>
            <a
              class={`nav-link ${isTest && "active"}`}
              data-toggle="pill"
              role="tab"
              aria-selected="false"
            >
              Test
            </a>
          </Link>
        </li>
      </ul>

      <button className="btn btn-danger col-1" onClick={handleLogOut}>
        Log out
      </button>
    </nav>
  );
}

export default Header;
