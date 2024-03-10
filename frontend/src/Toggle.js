import React, { useState, useEffect } from "react";
import "./index.css";
import { FaMoon, FaSun } from "react-icons/fa";

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "black" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setIsDarkMode(!isDarkMode);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDarkMode]);

  return (
    <div
      className={`toggle-container ${isDarkMode ? "dark" : "light"}`}
      onClick={handleToggle}
      aria-label="dark mode toggle"
    >
      <div className={`toggle-thumb ${isDarkMode ? "dark" : "light"}`}>
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </div>
    </div>
  );
};

export default Toggle;