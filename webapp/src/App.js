import React from "react";
import NavBar from "components/nav/NavBar";
import PortfolioSummary from "components/portfolio/PortfolioSummary";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ width: "25%", margin: "8px 18px" }}>
        <PortfolioSummary extraTickers={[1, 3]} />
      </div>
    </div>
  );
}

export default App;
