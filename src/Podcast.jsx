import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Podcast() {
  const location = useLocation();
  const navigate = useNavigate();
  const {podcastContent} = location.state || {};

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
        <button onClick={() => navigate('/')} className="button back">
          Back to Home
        </button>
      </div>
    </div>
  );
}
