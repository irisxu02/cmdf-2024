import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const PDFUpload = ({setInput, setPDF, pdf}) => {
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setPDF(event.target.files[0]);
      setInput(event.target.files[0].name)
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <input htmlFor="fileInput" id="fileInput" type="file" onChange={handleFileChange} accept=".pdf" style={{ display: "none" }} />
        <span className="icon">
          {pdf ? <FaRegCheckCircle style={{ color: "0B91E9" }} /> :  <FaFileUpload style={{ color: "white" }} />}
          </span>
    </label>
    </div>
  );
}

export default PDFUpload;
