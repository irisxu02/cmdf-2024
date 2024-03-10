import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import "../index.css";

const Basic = () => {
  return (
    <>
      <main className="basicContent">
        <div className="logoRight">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="subheading">EITMLI.</div>
        </div>
        <div className="basicPrompt">
          <div className="subheading gradientFont">BASIC</div>
          <div className="prompt">
            <div className="subtext">Explain</div>
            <input
              type="text"
              id="explain"
              name="explain"
              class="fullWidthInput"
              placeholder="type something you want to know here..."
            />
            <div className="subtext">...To Me Like I'm</div>
            <select id="age" name="age" class="dropdown">
              <option value="0-10">a Toddler</option>
              <option value="11-20">a Child</option>
              <option value="21-30">a Teenager</option>
              <option value="31-40">an Adult</option>
            </select>
          </div>
        </div>
      </main>
    </>
  );
};

export default Basic;
