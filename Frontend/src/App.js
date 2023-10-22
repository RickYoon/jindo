import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Invest from "pages/Invest"

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Invest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
