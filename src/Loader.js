"use client";
import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");

  const handleReadArticle = () => {
    console.log("Reading article:", url);
  };

  const handleGeneratePodcast = () => {
    console.log("Generating podcast for:", url);
  };

  const displayLoadingScreen = () => {
    console.log("Displaying loading screen");
  };

  const handleReadArticleClick = () => {
    handleReadArticle();
    displayLoadingScreen();
  };

  const handleGeneratePodcastClick = () => {
    handleGeneratePodcast();
    displayLoadingScreen();
  };

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
              onClick={handleReadArticleClick}
              className="button read-button"
            >
              Read the Article
            </button>
            <button
              onClick={handleGeneratePodcastClick}
              className="button podcast-button"
            >
              Generate a Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
