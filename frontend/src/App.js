import React, { useState } from "react";
import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState('');
	const [ageGroup, setAgeGroup] = useState('toddler');
	const [response, setResponse] = useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	  };
	const handleAgeChange = (event) => {
        setAgeGroup(event.target.value);
    };

	  const handleSubmit = () => {
        // Send a POST request to the Flask server
        fetch("http://127.0.0.1:4999/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputValue, ageGroup }),
        })
            .then((res) => res.json())
            .then((data) => {
				setResponse(data);
                console.log("Response from server:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

	return (
		<div className="App">
			<header className="App-header">
				<input 
					type="text" 
					value={inputValue} 
					onChange={handleInputChange} 
      			/>
				<select name="age" id="age" onChange={handleAgeChange}>
					<option value="toddler">Toddler</option>
					<option value="child">Child</option>
					<option value="teenager">Teenager</option>
					<option value="adult">Adult</option>
				</select>
				<button onClick={handleSubmit}>submit</button>
				<p>{response}</p>
			</header>
		</div>
	);
}

export default App;
