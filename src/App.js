import React, { useState } from "react";
import LocationTrack from "./locationTrack";
import "./App.css";
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <LocationTrack />
      </div>
      <hr style={{ color: "white", width: "80%", margin: "0 10% 0 10%" }} />
      <br></br>
      <div className="footer-info text-center">
        <p>Atul Anurag</p>
      </div>
    </React.Fragment>
  );
}

export default App;
