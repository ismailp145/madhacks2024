// SpeechSynthesisComponent.js
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./SpeechSynthesisComponent.css";

const SpeechSynthesisComponent = ({ text }) => {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");
  const wordRefs = useRef([]);

  const createNewUtterance = () => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 1;

    // Handle word highlighting and progress tracking
    newUtterance.onboundary = (event) => {
      if (event.name === "word") {
        setHighlightIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (wordRefs.current[newIndex]) {
            wordRefs.current[newIndex].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          setProgress((newIndex / words.length) * 100);
          return newIndex;
        });
      }
    };

    // Handle end of speech, reset state for replay
    newUtterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setHighlightIndex(0); // Reset highlighting
    };

    return newUtterance;
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      if (speechSynthesis.paused) {
        // Resume if paused
        speechSynthesis.resume();
      } else {
        // Start or restart the speech from beginning
        if (progress === 100 || highlightIndex === 0) {
          // Restart playback from the beginning
          speechSynthesis.cancel(); // Cancel any ongoing speech
          const newUtterance = createNewUtterance();
          setProgress(0);
          setHighlightIndex(0);
          speechSynthesis.speak(newUtterance);
        } else {
          // Start the speech for the first time
          const newUtterance = createNewUtterance();
          speechSynthesis.speak(newUtterance);
        }
      }
    } else {
      // Pause speech if playing
      speechSynthesis.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <p>
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => (wordRefs.current[index] = el)}
              style={{
                backgroundColor: index === highlightIndex ? "yellow" : "transparent",
                fontWeight: index === highlightIndex ? "bold" : "normal",
                padding: "0 2px",
              }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>

      {/* Audio Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Minimalistic Play and Pause Button */}
      <div className="controls">
        <button onClick={handlePlayPause} className="control-button">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
};

export default SpeechSynthesisComponent;
