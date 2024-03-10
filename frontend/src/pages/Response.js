import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import "../index.css";

const Response = () => {
  return (
    <>
      <main className="advancedContent">
        <div className="logoRight">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="subheading">EITMLI.</div>
        </div>
      </main>
    </>
  );
};

export default Response;
