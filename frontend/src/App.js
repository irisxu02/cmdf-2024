import React, { useState } from "react";
import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState('');
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
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
				<button onClick={handleSubmit}>submit</button>
			</header>
		</div>
	);
}

export default App;
