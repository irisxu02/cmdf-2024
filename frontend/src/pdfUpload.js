import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const PDFUpload = ({setInput}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setInput(event.target.files[0].name)
    // Reset upload status when a new file is selected
    setUploadStatus(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:4999/upload", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
        console.log('File uploaded successfully:', response);
      } else {
        setUploadStatus('error');
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <input htmlFor="fileInput" id="fileInput" type="file" onChange={handleFileChange} accept=".pdf" style={{ display: "none" }} />
        <span className="icon">
          {selectedFile ? <FaRegCheckCircle style={{ color: "0B91E9" }} /> :  <FaFileUpload style={{ color: "white" }} />}
          </span>
    </label>
    </div>
  );
}

export default PDFUpload;
