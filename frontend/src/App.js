import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Register } from "./Pages/Register/Register";
import { Person } from "./Pages/Person/Person";
import { NavigationMenu } from "./Componente/./navigation/NavigationMenu";
function App() {
  return (
    <>
      <NavigationMenu />
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Person" element={<Person />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
