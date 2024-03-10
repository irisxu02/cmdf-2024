import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';
import '../index.css';

const Home = () => {
  useEffect(() => {
    const loadParticlesJS = async () => {
      if (typeof window.particlesJS === 'undefined') {
        // If particlesJS is not defined, dynamically load the script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If particlesJS is already defined, initialize it directly
        window.particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 380,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#0B91E9"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#0B91E9"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#0B91E9",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }
    };

    loadParticlesJS();
    

    // Clean up function to remove the dynamically added script
    return () => {
      const script = document.querySelector('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once after component mounts

  return (
    <>
      <main className="homeContent">
      
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="title">Explain It To Me Like I'm...</div>
        </div>
        <div className="navLinks">
          <Link to="/basic">
            <button className="fancy">BASIC</button>
          </Link>
          <Link to="/advanced">
            <button className="fancy">ADVANCED</button>
            
          </Link>
        </div>
        <div id="particles-js"></div> {/* This is where the particles will be rendered */}
      </main>
    </>
  );
};

export default Home;