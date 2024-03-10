import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { BrowserRouter } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import Basic from "./pages/Basic";
import Advanced from "./pages/Advanced";
// import particlesJS from 'react-particles-js';


// particlesJS.load('particles-js', 'assets/particles.json', function() {
// 	console.log('callback - particles.js config loaded');
//   });


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
	<BrowserRouter>
	<GoogleFontLoader
        fonts={[
          {
            font: 'Tomorrow',
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
        ]}
      />
    <Routes>
      <Route path="/" element={<Home />} />
	  <Route path="/basic" element={<Basic />} />
	  <Route path="/advanced" element={<Advanced />} />
      <Route
        path="*"
        element={
          <div className="App">
            <header className="App-header">
              <h1>React and flask</h1>
              {/* Calling a data from setdata for showing */}
              <p>{data.name}</p>
              <p>{data.age}</p>
              <p>{data.date}</p>
              <p>{data.programming}</p>
            </header>
          </div>
        }
      />
    </Routes>
	</BrowserRouter>
  );
}

export default App;
