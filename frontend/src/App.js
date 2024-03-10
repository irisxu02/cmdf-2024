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
    </Routes>
	</BrowserRouter>
  );
}

export default App;
