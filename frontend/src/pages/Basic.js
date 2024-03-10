import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import VoiceInput from "../VoiceInput";
import PDFUpload from "../pdfUpload";
import "../index.css";

const Basic = () => {
  const [inputValue, setInputValue] = useState("");
  const [ageGroup, setAgeGroup] = useState("toddler");
  const [role, setRole] = useState("");
  const [length, setLength] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("basic");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAgeGroup(event.target.value);
  };
  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = () => {
    if (mode === "basic") {
      // Send a POST request to the Flask server
      fetch("http://127.0.0.1:4999/basic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue, ageGroup}),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          console.log("Response from server:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Send a POST request to the Flask server
      fetch("http://127.0.0.1:4999/advanced", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue, ageGroup, role, length }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          console.log("Response from server:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [promptContent, setPromptContent] = useState(
    ""
  );

  const [basicButtonClass, setBasicButtonClass] = useState(
    "subheading gradientFont"
  );
  const [advancedButtonClass, setAdvancedButtonClass] = useState(
    "subheading gradientFont grey"
  );

  const handleBasicClick = () => {
    setPromptContent(
      ""
    );
    setBasicButtonClass("subheading gradientFont");
    setAdvancedButtonClass("subheading gradientFont grey");
    setMode("basic");
  };

  const handleAdvancedClick = () => {
    setPromptContent(
      <div id="prompt" className="prompt2">
        <div className="subtext">who is a </div>
        <input
          type="text"
          id="explain"
          name="explain"
          class="inputField"
          placeholder="role type"
          onChange={handleRoleChange}
        />
        <div className="subtext">in a </div>
        <select id="length" name="age" class="dropdown" onChange={handleLengthChange}>
          <option value="sentence">sentence.</option>
          <option value="paragraph">paragraph.</option>
          <option value="page">page.</option>
        </select>
      </div>
    );
    setBasicButtonClass("subheading gradientFont grey");
    setAdvancedButtonClass("subheading gradientFont");
    setMode("advanced");
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
          <div className="views">
            <div
              id="basic"
              className={basicButtonClass}
              onClick={handleBasicClick}
            >
              BASIC
            </div>
            <div
              id="advanced"
              className={advancedButtonClass}
              onClick={handleAdvancedClick}
            >
              ADVANCED
            </div>
          </div>
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
        <VoiceInput setInput={setInputValue} />
        <div className="subtext">To Me Like I'm</div>
        <select id="age" name="age" class="dropdown" onChange={handleAgeChange}>
          <option value="0-10">a Toddler</option>
          <option value="11-20">a Child</option>
          <option value="21-30">a Teenager</option>
          <option value="31-40">an Adult</option>
        </select>
        {promptContent}
      </div>
          
          <div className="center">
            <button onClick={handleSubmit} className="fancy center">EXPLAIN</button>
            <p>{response.text}</p>
          </div>
          <PDFUpload />
        </div>
      </main>
    </>
  );
};

export default Basic;
