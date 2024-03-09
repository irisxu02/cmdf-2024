// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	// SAMPLE FIELDS
	const [data, setdata] = useState({
		name: "",
		age: 0,
		date: "",
		programming: "",
	});

	const [inputValue, setInputValue] = useState('');
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		console.log(inputValue);
	  };

	  const handleSubmit = () => {
        // Send a POST request to the Flask server
        fetch("http://127.0.0.1:4999/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputValue }),
        })
            .then((res) => res.json())
            .then((data) => {
				setdata(data);
                console.log("Response from server:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

	return (
		<div className="App">
			<header className="App-header">
				<h1>React and flask</h1>
				{/* SAMPLE CONTENT */}
				<p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
				<p>{data.programming}</p>
				{/* TEST CONTENT */}
				<input 
					type="text" 
					value={inputValue} 
					onChange={handleInputChange} 
      			/>
				<button onClick={handleSubmit}>submit</button>
			</header>
		</div>
	);
}

export default App;
