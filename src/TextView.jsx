// TextView.js
import React, { useState } from 'react';
import './TextView.css'; // Import the CSS file

const TextView = ({ content }) => {
  const [fontSize, setFontSize] = useState(16);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(12, prevSize - 2));
  };

  const toggleHighlight = () => {
    setIsHighlighted((prevHighlight) => !prevHighlight);
  };

  return (
    <div className="text-view">
      <div className="controls">
        <button onClick={increaseFontSize} className="button font-control">Font+</button>
        <button onClick={decreaseFontSize} className="button font-control">Font-</button>
        <button onClick={toggleHighlight} className="button font-control">
          {isHighlighted ? "Remove Highlight" : "Highlight"}
        </button>
      </div>
      <div
        className="content"
        style={{
          fontSize: `${fontSize}px`,
          backgroundColor: isHighlighted ? '#fffbcc' : 'transparent',
        }}
      >
        {content ? (
          <p>{content}</p>
        ) : (
          <p>No content available. Please enter a URL and submit.</p>
        )}
      </div>
    </div>
  );
};

export default TextView;
