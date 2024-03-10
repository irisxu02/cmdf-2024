import React, { useState } from "react";
import "./index.css";
import { FaMicrophone } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  document.body.style.backgroundColor = isDarkMode ? 'black' : 'white';
  document.body.style.color = isDarkMode ? 'white' : 'black';

  return (
    <div
      className={`toggle-container ${isDarkMode ? "dark" : "light"}`}
      onClick={handleToggle}
    >
      <div className={`toggle-thumb ${isDarkMode ? "dark" : "light"}`}>
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </div>
    </div>
  );
};

export default Toggle;
