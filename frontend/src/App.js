// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
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
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  // Using useEffect for single rendering
//   useEffect(() => {
//     // Using fetch to fetch the api from
//     // flask server it will be redirected to proxy
//     fetch("http://127.0.0.1:4999/data").then((res) =>
//       res.json().then((data) => {
//         // Setting a data from api
//         setdata({
//           name: data.Name,
//           age: data.Age,
//           date: data.Date,
//           programming: data.programming,
//         });
//       })
//     );
//   }, []);

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
