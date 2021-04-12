import React from 'react';
import NavBar from "components/nav/NavBar";
import PortfolioSummary from "components/portfolio/PortfolioSummary";

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <PortfolioSummary/>
    </div>
  );
}

export default App;
