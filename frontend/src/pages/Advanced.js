import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import "../index.css";

const Advanced = () => {
  return (
    <>
      <main className="advancedContent">
        <div className="logoRight">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="subheading">EITMLI.</div>
        </div>
        <div className="basicPrompt">
        <div className="subheading gradientFont">ADVANCED</div>
        <div className="prompt">
            <div className="subtext">Explain</div>
            <input
              type="text"
              id="explain"
              name="explain"
              class="fullWidthInput"
              placeholder="type something you want to know here..."
            />
            <div className="subtext">To Me Like I'm</div>
            <select id="age" name="age" class="dropdown">
              <option value="0-10">a Toddler</option>
              <option value="11-20">a Child</option>
              <option value="21-30">a Teenager</option>
              <option value="31-40">an Adult</option>
            </select>
            <div className="subtext">who is a </div>
            <input
              type="text"
              id="explain"
              name="explain"
              class="inputField"
              placeholder="role type"
            />
            <div className="subtext">in a </div>
            <select id="length" name="age" class="dropdown">
              <option value="sentence">sentence.</option>
              <option value="paragraph">paragraph.</option>
              <option value="page">page.</option>
            </select>
          </div>
          <div className="center">
            <Link to="/response">
              <button className="fancy center">EXPLAIN</button>
            </Link>
            <div className="response"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Advanced;
