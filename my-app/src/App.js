import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProveedorPage from './components/ProveedorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/proveedor" element={<ProveedorPage />} />
      </Routes>
    </Router>
  );
};

export default App;

