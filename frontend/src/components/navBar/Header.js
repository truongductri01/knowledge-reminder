import React from "react";
import "../../../static/css/navBar/index.css";

function Header() {
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
    <div className="header">
      <div className="header_menu">
        <img src="../../../static/images/menu.svg" alt="" />
      </div>
      <div className="header_logo">
        <img src="../../../static/images/logo.png" alt="" />
      </div>
      <div className="header_search">
        <img src="../../../static/images/search.svg" alt="" />
      </div>
      <div className="header_logout">
        <button className="btn btn-secondary">Log Out</button>
      </div>
    </div>
  );
}

export default Header;
