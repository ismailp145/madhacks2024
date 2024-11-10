import React from 'react'
import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './HomePage.css'
import HomePage from './HomePage.jsx'
// import AboutPage from './AboutPage.jsx' // Example of additional page/component
import DisplayPage from './DisplayPage.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/displayPage" element={<DisplayPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

