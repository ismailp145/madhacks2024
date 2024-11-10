import React from 'react'
import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './HomePage.css'
import HomePage from './HomePage.jsx'
import DisplayPodcast from "./DisplayPodcast.jsx";
import DisplayArticle from "./DisplayArticle.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/displayArticle" element={<DisplayArticle />} />
        <Route path="/displayPodcast" element={<DisplayPodcast />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

