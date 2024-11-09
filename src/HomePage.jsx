'use client'

import React, { useState, useCallback } from 'react'
import { useEffect } from 'react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }, [])

  const handleReadArticle = () => {
    fetchData()
    console.log('Reading article:', url)
  }

  const handleGeneratePodcast = () => {
    fetchData()
    console.log('Generating podcast for:', url)
  }

// const handleReadArticle = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/scrape', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url }),
//       })
//       const data = await response.json()
//       if (data.error) {
//         console.error(data.error)
//       } else {
//         setArticleData(data)
//         console.log('Article data:', data)
//       }
//     } catch (error) {
//       console.error('Error fetching article:', error)
//     }
//   }

//   const handleGeneratePodcast = () => {
//     console.log('Generating podcast for:', url)
//   }
  

  const [data, setData] = useState(null);

const fetchData = async () => {
      try {
        const response = await fetch('https://madhacks2024-api.vercel.app/scrape?subject=India');
        const d = await response.json();
        console.log(d.data);
        setData(d);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


/**
 * url --> 
 * 
 * --->bs4 method
 * 
 * 
 * 
 */
 


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
            <button 
            onClick={handleGeneratePodcast} 
            className="button podcast"

            // setData
            >
              Generate a Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
