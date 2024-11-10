'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Button Component for Navigation
function NavigateButton({ text, to, onClick, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(to);
  };

  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
}

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
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

  const handleReadArticle = async () => {
    await fetchData(url);
  };

  const handleGeneratePodcast = () => {
    console.log('Generating podcast for:', url);
  };

  const fetchData = async (subject) => {
    try {
      const response = await fetch(`https://madhacks2024-api.vercel.app/scrape?subject=${subject}`);
      const d = await response.json();
      console.log('Data:', d);
      setData(d.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const slowFactor = 8;

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="background">
        {dots.map((dot, i) => {
          const { left, top } = dot;
          const centerX = 50;
          const centerY = 50;
          const distanceX = left - centerX;
          const distanceY = top - centerY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          const toTranslateX = (mousePosition.x / window.innerWidth - 0.5) * distance * slowFactor;
          const toTranslateY = (mousePosition.y / window.innerHeight - 0.5) * distance * slowFactor;

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
        <h1 className="title">Welcome to Article Reader</h1>
        <div className="input-container">
          <input
            type="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <div className="button-container">
            <NavigateButton
              text="Read the Article"
              to="/Article"
              onClick={handleReadArticle}
              className="button read"
            />
            <NavigateButton
              text="Generate a Podcast"
              to="/Podcast"
              onClick={handleGeneratePodcast}
              className="button podcast"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
