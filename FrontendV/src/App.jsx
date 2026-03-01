import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import DatasetPage from './pages/DatasetPage';
import MethodologyPage from './pages/MethodologyPage';
import ModelTrainingPage from './pages/ModelTrainingPage';
import PredictionPage from './pages/PredictionPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dataset" element={<DatasetPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="training" element={<ModelTrainingPage />} />
          <Route path="prediction" element={<PredictionPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
