import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import VoiceInput from "../VoiceInput"
import "../index.css";

const Basic = () => {
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
    <>
      <main className="basicContent">
        <div className="logoRight">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="subheading">EITMLI.</div>
        </div>
        <div className="basicPrompt">
          <div className="subheading gradientFont">BASIC</div>
          <div className="prompt">
            <div className="subtext">Explain</div>
            <input
              type="text"
              id="explain"
              name="explain"
              class="fullWidthInput"
              placeholder="type something you want to know here..."
              onChange={handleInputChange}
              value={inputValue}
            />
            <VoiceInput setInput={setInputValue}/>
            <div className="subtext">To Me Like I'm</div>
            <select id="age" name="age" class="dropdown" onChange={handleAgeChange}>
              <option value="0-10">a Toddler</option>
              <option value="11-20">a Child</option>
              <option value="21-30">a Teenager</option>
              <option value="31-40">an Adult</option>
            </select>
            <button onClick={handleSubmit}>submit</button>
            <p>{response}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Basic;
