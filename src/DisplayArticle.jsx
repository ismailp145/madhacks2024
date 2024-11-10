"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DisplayArticle() {
  const [url, setUrl] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const initialDots = [...Array(200)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 200,
    }));
    setDots(initialDots);
  }, []);

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);



  const handleSubmit = () => {
    fetchData(url);
    console.log("Reading Article:", url);

  };

   const fetchData = async (subject) => {
     try {
       const response = await fetch(
         `https://madhacks2024-api.vercel.app/scrape?subject=${subject}`
       );
       const d = await response.json();
       console.log("Data:", d);
       setData(d.data);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

  const goBack = () => {
    navigate("/");  
  };


  const slowFactor = 8; // Adjust this value to make the movement slower

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="background">
        {dots.map((dot, i) => {
          const { left, top } = dot;
          const centerX = 50; // Center of the screen in percentage
          const centerY = 50; // Center of the screen in percentage
          const distanceX = left - centerX;
          const distanceY = top - centerY;
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );

          const toTranslateX =
            (mousePosition.x / window.innerWidth - 0.5) * distance * slowFactor;
          const toTranslateY =
            (mousePosition.y / window.innerHeight - 0.5) *
            distance *
            slowFactor;

          return (
            <div
              key={i}
              className="dot"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(${toTranslateX}px, ${toTranslateY}px)`,
              }}
            />
          );
        })}
      </div>
      <div className="content">
        <h1 className="title">Podcast Generator</h1>
        <p>Input a topic and get a podcast generated</p>
        <div className="input-container">
          <input
            type="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <div className="button-container">
            <button onClick={handleSubmit} className="button read">
              Submit
            </button>
            <button onClick={goBack} className="button podcast">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
