'use client'

import React, { useState, useCallback } from 'react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }, [])

  const handleReadArticle = () => {
    console.log('Reading article:', url)
  }

  const handleGeneratePodcast = () => {
    console.log('Generating podcast for:', url)
  }

  return (
    <div 
      className="container"
      onMouseMove={handleMouseMove}
    >
      <div className="background">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${(mousePosition.y / window.innerHeight - 0.5) * 20}px)`,
            }}
          />
        ))}
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
            <button onClick={handleReadArticle} className="button read">
              Read the Article
            </button>
            <button onClick={handleGeneratePodcast} className="button podcast">
              Generate a Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
