import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import MuseumScene from '../MuseumScene';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/museum" element={<MuseumScene />} />
    </Routes>
  );
};

export default AppRoutes;