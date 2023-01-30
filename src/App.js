import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MainNavigation } from './components/layout/MainNavigation';

import ConversionHistory from './pages/ConversionHistory';
import { CurrencyConversion } from './pages/CurrencyConversion';

function App() {
  return (
    <BrowserRouter>
      <MainNavigation>
        <Routes>
          <Route exact path="/" element={<Navigate to="/conversion" />} />
          <Route path="/history" element={<ConversionHistory />} />
          <Route path="/conversion/:from?/:to?/:val?" element={<CurrencyConversion />} />
        </Routes>
      </MainNavigation>
    </BrowserRouter>
  );
}

export default App;
