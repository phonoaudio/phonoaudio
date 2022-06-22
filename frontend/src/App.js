import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Register } from "./Pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/graph" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
