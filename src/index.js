import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import ConversionHistory from './pages/ConversionHistory';
import { CurrencyConversion } from './pages/CurrencyConversion';
import { MainNavigation } from './components/layout/MainNavigation';

export default function Router() {
  return (
    <BrowserRouter>
      <MainNavigation>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/">
            <Route path="history" element={<ConversionHistory />} />
            <Route path="conversion/:from?/:to?/:val?" element={<CurrencyConversion />} />
          </Route>
        </Routes>
      </MainNavigation>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
