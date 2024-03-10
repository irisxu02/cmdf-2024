import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import VoiceInput from "../VoiceInput";
import PDFUpload from "../pdfUpload";
import "../index.css";
import { useEffect } from "react";
import Toggle from "../Toggle";
import { useLocation } from "react-router-dom";
import loading from "../imgs/load-35_256.gif";
import ScrollToTopButton from "../ScrollTop";

const Basic = () => {
  const [inputValue, setInputValue] = useState("");
  const [ageGroup, setAgeGroup] = useState("toddler");
  const [role, setRole] = useState("");
  const [length, setLength] = useState("");
  const [response, setResponse] = useState("");
  const location = useLocation();
  const [mode, setMode] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);

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

  const handleSubmitPDF = async () => {
    const formData = new FormData();
    formData.append("pdfFile", selectedPDF);

    try {
      const response = await fetch("http://127.0.0.1:4999/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully:", response);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleGoUp = () => {
    console.log("hello");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Scroll to the response id div
    document.getElementById("response").style.minHeight = "700px";
    document.getElementById("response").style.display = "flex";
    window.scrollTo({
      top: document.getElementById("response").offsetTop,
      behavior: "smooth",
    });
    if (inputValue.includes(".pdf")) {
      handleSubmitPDF();
    }
    if (mode === "basic") {
      // Send a POST request to the Flask server
      fetch("http://127.0.0.1:4999/basic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue, ageGroup }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setIsLoading(false);
          console.log(isLoading);
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
          setIsLoading(false);
          console.log("Response from server:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [basicButtonClass, setBasicButtonClass] = useState(
    "subheading gradientFont"
  );
  const [advancedButtonClass, setAdvancedButtonClass] = useState(
    "subheading gradientFont grey"
  );

  const handleBasicClick = () => {
    setBasicButtonClass("subheading gradientFont");
    setAdvancedButtonClass("subheading gradientFont grey");
    setMode("basic");
  };

  const handleAdvancedClick = () => {
    setBasicButtonClass("subheading gradientFont grey");
    setAdvancedButtonClass("subheading gradientFont");
    setMode("advanced");
  };

  useEffect(() => {
    const loadParticlesJS = async () => {
      // If particlesJS is already defined, initialize it directly
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: "#0B91E9",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#0B91E9",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 6,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0B91E9",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    };

    loadParticlesJS();

    // Clean up function to remove the dynamically added script
    return () => {
      const script = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once after component mounts

  return (
    <>
      <main className="basicContent">
        <ScrollToTopButton handleClick={handleGoUp} />
        <div id="particles-js"></div>
        <div id="logoRight" className="logoRight">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="subheading">EMILI.</div>
          </div>
          <Toggle />
        </div>

        <div className="basicPrompt glass">
          <div className="views">
            <div
              id="basic"
              className={basicButtonClass}
              onClick={handleBasicClick}
              aria-label="basic view button"
            >
              BASIC
            </div>
            <div className="subheading">/</div>
            <div
              id="advanced"
              className={advancedButtonClass}
              onClick={handleAdvancedClick}
              aria-label="advanced view button"
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
              className="fullWidthInput"
              placeholder="type something you want to know here..."
              onChange={handleInputChange}
              value={inputValue}
            />
            <VoiceInput setInput={setInputValue} />
            <PDFUpload
              setInput={setInputValue}
              setPDF={setSelectedPDF}
              pdf={selectedPDF}
            />
            <div className="subtext">To Me Like I'm</div>
            <label for="age" style={{ position: "absolute", left: "-9999px" }}>
              Age:
            </label>
            <select
              id="age"
              name="age"
              className="dropdown"
              onChange={handleAgeChange}
            >
              <option value="baby">a Baby</option>
              <option value="child">a Child</option>
              <option value="teenager">a Teenager</option>
              <option value="adult">an Adult</option>
            </select>
            {mode == "advanced" ? (
              <div id="prompt" className="prompt2">
                <div className="subtext">who is a </div>
                <input
                  type="text"
                  id="explain"
                  name="explain"
                  class="inputField"
                  placeholder="chemist"
                  onChange={handleRoleChange}
                />
                <div className="subtext">in </div>
                <select
                  id="length"
                  name="age"
                  class="dropdown"
                  onChange={handleLengthChange}
                >
                  <option value="paragraph">a paragraph</option>
                  <option value="pointform">point form</option>
                  <option value="page">a page</option>
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="subtext">.</div>
          </div>
          <div className="center">
            <button
              onClick={handleSubmit}
              className="fancy center"
              aria-label="explain"
            >
              EXPLAIN
            </button>
          </div>
        </div>
        <div className="response" id="response">
          <div className="subheading gradientFont">EMILI says...</div>
          {isLoading && <img src={loading} alt="Loading..." />}

          {!isLoading && response.text && (
            <div className="responseText">
              {response.text?.split("\n").map((line, index) => {
                if (line.trim().startsWith("-")) {
                  return <p key={index}>{line.trim()}</p>;
                }
                return <p key={index}>{line}</p>;
              })}
              <div
                class="subtext gradientFont"
                style={{ paddingTop: "20px", fontWeight: "500" }}
              >
                Sources
              </div>
              <ol class="sources-container">
                {response.citations.map((citation, index) => (
                  <li key={index} className="source">
                    <a
                      href={citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "white" }}
                    >
                      {citation}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Basic;
