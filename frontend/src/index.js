import React from "react";
import ReactDOM from "react-dom";
import Chart from "./Componente/Charts/Charts";
import StatusBar from "./StatusBar/StatusBar";
import "./style.css";
ReactDOM.render(
  <React.StrictMode>
    <StatusBar />
    <Chart />
  </React.StrictMode>,
  document.getElementById("root")
);
