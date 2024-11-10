import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpeechSynthesisComponent from './SpeechSynthesisComponent';

export default function Podcast() {
  const location = useLocation();
  const navigate = useNavigate();
  const { podcastContent } = location.state || {};

  return (
    <div className="container">
      <div className="background">
        {/* Optional: Include the same dot animation as in HomePage */}
      </div>
      <div className="content">
        <h1 className="title">Podcast Content</h1>
        <div className="article-body">
          {podcastContent ? (
            <p>{podcastContent}</p>
          ) : (
            <p>Loading content...</p>
          )}
        </div>
        
        {/* Speech Synthesis Component with podcastContent as the initial text */}
        <SpeechSynthesisComponent initialText={podcastContent || "Welcome to the Podcast!"} />
        
        <button onClick={() => navigate('/')} className="button back">
          Back to Home
        </button>
      </div>
    </div>
  );
}
