import React from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTop = ({ handleClick }) => {
  return (
    <button className="scroll-to-top-button" onClick={handleClick}>
      <FaArrowUp />
    </button>
  );
};

export default ScrollTop;