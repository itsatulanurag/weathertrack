import React, { useState } from "react";
import LocationTrack from "./locationTrack";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <LocationTrack />
      </div>
      <div className="info">Atul Anurag</div>
    </React.Fragment>
  );
}

export default App;
