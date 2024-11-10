'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dots, setDots] = useState([])
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


    const displayLoadingScreen = () => {
      console.log("Displaying loading screen");
    };

  const handleReadArticle = () => {
    console.log('Reading article:', url)
    navigate('/displayArticle'); 
  }

  const handleGeneratePodcast = () => {
    console.log("Generating podcast for:", url);
    navigate('/displayPodcast'); 
  }
  const handleConversation = () => {
    console.log("Starting conversation for:", url);
    navigate('/conversation');
  }

  const slowFactor = 8; // Adjust this value to make the movement slower

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="background">
        {dots.map((dot, i) => {
          const { left, top } = dot;
          const centerX = 50;
          const centerY = 50;
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
        <h1 className="title">Welcome to Pod-Studious</h1>
        <p>An AI Article Reader for when you're on the go.</p>
        <p>
          Simply paste the URL of the article you'd like to listen to and let
          Pod-Studious do the rest.
        </p>
        <div className="button-container">
          <button onClick={handleReadArticle} className="button read">
            Read the Article
          </button>
          <button onClick={handleGeneratePodcast} className="button podcast">
            Generate a Podcast
          </button>
          <button onClick={handleConversation} className='button conversation'>
            Interactive Conversation
          </button>
        </div>
      </div>
    </div>

  );
}
