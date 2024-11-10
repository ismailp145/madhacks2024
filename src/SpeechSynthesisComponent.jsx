import React, { useState, useEffect } from 'react';
import useSpeechSynthesis from './useSpeechSynthesis';

const SpeechSynthesisComponent = ({ text }) => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [displayText, setDisplayText] = useState(text || "Welcome to the Article Reader!");
  const { supported, speak, speaking, cancel, voices } = useSpeechSynthesis();

  useEffect(() => {
    setDisplayText(text); // Update displayText when the prop text changes
  }, [text]);

  const handleSpeak = () => {
    if (displayText && selectedVoice) {
      speak({ text: displayText, voice: selectedVoice });
    } else {
      speak({ text: displayText });
    }
  };

  return (
    <div className="speech-synthesis">
      <h2>Text-to-Speech</h2>
      {supported ? (
        <>
          <textarea
            value={displayText}
            onChange={(e) => setDisplayText(e.target.value)}
            placeholder="Type something to speak"
            rows="4"
            cols="50"
          />
          <div>
            <label htmlFor="voices">Select Voice: </label>
            <select
              id="voices"
              onChange={(e) =>
                setSelectedVoice(voices.find((voice) => voice.name === e.target.value))
              }
            >
              <option value="">Default Voice</option>
              {voices.map((voice, index) => (
                <option key={index} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSpeak} disabled={speaking} className="button speak">
            {speaking ? "Speaking..." : "Speak"}
          </button>
          <button onClick={cancel} disabled={!speaking} className="button stop">
            Stop
          </button>
        </>
      ) : (
        <p>Your browser does not support Speech Synthesis.</p>
      )}
    </div>
  );
};

export default SpeechSynthesisComponent;
