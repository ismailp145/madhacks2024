import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextView from "./TextView";
import SpeechSynthesisComponent from "./SpeechSynthesisComponent";

export default function Conversation() {
  const [url, setUrl] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const [podcastContent, setPodcastContent] = useState("Welcome to the Podcast!");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null); // Store the recognition object here
  const navigate = useNavigate();

  useEffect(() => {
    const initialDots = [...Array(200)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 200,
    }));
    setDots(initialDots);
  }, []);

  useEffect(() => {
    console.log("Transcript updated:", transcript); // Log transcript after it's updated
  }, [transcript]);

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleSubmit = () => {
    fetchPrompt(url);
    console.log("Reading Article:", url);
  };

  const fetchPrompt = async (subject) => {
    try {
      console.log("Fetching data for:", subject);
      const response = await fetch(`https://madhacks2024-api.vercel.app/conv?n=${subject}`);
      const d = await response.json();
      console.log("Data:", d);
      setPodcastContent(JSON.stringify(d.response) || "Content not available");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    fetchPrompt(transcript);
  }, [transcript]);

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Stopped listening");
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        console.log("Speech recognition result:", event);
        const speechResult = event.results[0][0].transcript;
        console.log("Recognized text:", speechResult);
        setTranscript((prev) => `${prev} ${speechResult}`);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopListening();
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        stopListening();
      };

      recognitionRef.current = recognition; // Store recognition object in ref
      recognition.start();
    } else {
      alert("Your browser doesn't support speech recognition.");
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
        <h1 className="title">Converse AI</h1>
        <p>Input a topic, and have a conversation with the AI</p>
        <div className="input-container">
          <input
            type="url"
            placeholder="Enter topic"
            value={url} // Display updated transcript or URL
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

        <button
          onClick={toggleListening}
          style={{
            backgroundColor: isListening ? "red" : "green",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "20px 0",
          }}
        >
          {isListening ? "Listening..." : "Start Listening"}
        </button>
        <p>Transcript: {transcript}</p>

        <div className="text-view-container">
          <SpeechSynthesisComponent text={podcastContent} />
        </div>
      </div>
    </div>
  );
}
