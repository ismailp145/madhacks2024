import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Article from './Article';
import Podcast from './Podcast';
import './HomePage.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Article" element={<Article />} />
        <Route path="/Podcast" element={<Podcast />} />
      </Routes>
    </Router>
  </StrictMode>,
);
