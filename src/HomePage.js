"use client";
import { useState } from "react";
import "./HomePage.css"; // Ensure this file exists with the styles below

export default function HomePage() {
  const [url, setUrl] = useState("");

  const handleReadArticle = () => {
    console.log("Reading article:", url);
  };

  const handleGeneratePodcast = () => {
    console.log("Generating podcast for:", url);
  };

  function displayLoadingScreen() {
    // Create a loading screen element
    const loadingScreen = document.createElement("div");
    loadingScreen.classList.add("loading-screen");

    // Add loading animation or text to the loading screen
    loadingScreen.innerHTML = "Loading...";

    // Append the loading screen to the document body
    document.body.appendChild(loadingScreen);

    // Simulate a loading process
    setTimeout(() => {
      // Remove the loading screen after a certain duration
      document.body.removeChild(loadingScreen);
    }, 2000); // Change the duration (in milliseconds) as needed
  }

  function eventListener() {
    // Get the button element from the home page
    const button = document.getElementById("read-button");

    // Add a click event listener to the button
    button.addEventListener("click", displayLoadingScreen);

    const buttonP = document.getElementById("podcast-button");

    buttonP.addEventListener("click", displayLoadingScreen);
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome to Article Reader</h1>
        <div className="input-group">
          <input
            type="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <div className="button-group">
            <button
              onClick={(handleReadArticle, displayLoadingScreen)}
              className="button read-button"
              id="read-button"
            >
              Read the Article
            </button>
            <button
              onClick={(handleGeneratePodcast, displayLoadingScreen)}
              className="button podcast-button"
              id="podcast-button"
            >
              Generate a Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
