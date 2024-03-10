import React, { useState } from 'react';

const PDFUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // Reset upload status when a new file is selected
    setUploadStatus(null);
  };

//   const dataToSend = {
//     name: "John Doe",
//     age: 30,
//     email: "john@example.com"
//   };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:4999/upload", {
        method: 'POST',
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(dataToSend),
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
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleSubmit}>Upload</button>
      {uploadStatus === 'success' && <p style={{ color: 'green' }}>File uploaded successfully!</p>}
      {uploadStatus === 'error' && <p style={{ color: 'red' }}>Error uploading file. Please try again.</p>}
    </div>
  );
}

export default PDFUpload;
