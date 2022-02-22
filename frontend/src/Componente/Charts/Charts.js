import React, { useState } from "react";
import { Chart } from "react-google-charts";
import "./Charts.style.css";

export const EOptions = {
  title: "Audição Esquerda",
  curveType: "function",
  legend: { position: "bottom" },
};

export const DOptions = {
  title: "Audição Direita",
  curveType: "function",
  legend: { position: "bottom" },
};

function Charts() {
  var orelhaDireita = [1.1, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

  var orelhaEsquerda = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

  const [oEArray, setOEArray] = useState(orelhaEsquerda);

  const [oDArray, setODArray] = useState(orelhaDireita);

  var Edata = [
    ["dB", "KHz"],
    ["0,25", oEArray[0]],
    ["0,5", oEArray[1]],
    ["1", oEArray[2]],
    ["2", oEArray[3]],
    ["3", oEArray[4]],
    ["4", oEArray[5]],
    ["6", oEArray[6]],
    ["8", oEArray[7]],
  ];

  var Ddata = [
    ["dB", "KHz"],
    ["0,25", oDArray[0]],
    ["0,5", oDArray[1]],
    ["1", oDArray[2]],
    ["2", oDArray[3]],
    ["3", oDArray[4]],
    ["4", oDArray[5]],
    ["6", oDArray[6]],
    ["8", oDArray[7]],
  ];

  const [Echart, setEChart] = useState(Edata);
  const [Dchart, setDChart] = useState(Ddata);

  function onSubE() {
    Edata = [
      ["dB", "KHz"],
      ["0,25", oEArray[0]],
      ["0,5", oEArray[1]],
      ["1", oEArray[2]],
      ["2", oEArray[3]],
      ["3", oEArray[4]],
      ["4", oEArray[5]],
      ["6", oEArray[6]],
      ["8", oEArray[7]],
    ];
    console.log(Edata);
    setEChart(Edata);
  }

  function onSubD() {
    Ddata = [
      ["dB", "KHz"],
      ["0,25", oDArray[0]],
      ["0,5", oDArray[1]],
      ["1", oDArray[2]],
      ["2", oDArray[3]],
      ["3", oDArray[4]],
      ["4", oDArray[5]],
      ["6", oDArray[6]],
      ["8", oDArray[7]],
    ];

    setDChart(Ddata);
  }

  return (
    <div className="App">
      <div className="charts">
        <Chart
          chartType="ScatterChart"
          width="80%"
          height="300px"
          data={Echart}
          options={EOptions}
        />

        <Chart
          chartType="ScatterChart"
          width="80%"
          height="300px"
          data={Dchart}
          options={DOptions}
        />
      </div>

      <div className="spaces-inputs">
        <div className="inputs">
          <input
            type="number"
            name="0,25 "
            placeholder="0,25"
            onChange={(e) => {
              orelhaEsquerda[0] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="0,5"
            placeholder="0,5"
            onChange={(e) => {
              orelhaEsquerda[1] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="1"
            placeholder="1"
            onChange={(e) => {
              orelhaEsquerda[2] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="2"
            placeholder="2"
            onChange={(e) => {
              orelhaEsquerda[3] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="3"
            placeholder="3"
            onChange={(e) => {
              orelhaEsquerda[4] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="4"
            placeholder="4"
            onChange={(e) => {
              orelhaEsquerda[5] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="6"
            placeholder="6"
            onChange={(e) => {
              orelhaEsquerda[6] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>

          <input
            type="number"
            name="8"
            placeholder="8"
            onChange={(e) => {
              orelhaEsquerda[7] = parseFloat(e.target.value);
              setOEArray(orelhaEsquerda);
            }}
          ></input>
          <button onClick={() => onSubE()}> Plotar</button>
        </div>

        <div className="inputsD">
          <input
            type="number"
            name="D25"
            placeholder="0,25"
            onChange={(e) => {
              orelhaDireita[0] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D5"
            placeholder="0,5"
            onChange={(e) => {
              orelhaDireita[1] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D1"
            placeholder="1"
            onChange={(e) => {
              orelhaDireita[2] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D2"
            placeholder="2"
            onChange={(e) => {
              orelhaDireita[3] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D3"
            placeholder="3"
            onChange={(e) => {
              orelhaDireita[4] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D4"
            placeholder="4"
            onChange={(e) => {
              orelhaDireita[5] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D6"
            placeholder="6"
            onChange={(e) => {
              orelhaDireita[6] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <input
            type="number"
            name="D8"
            placeholder="8"
            onChange={(e) => {
              orelhaDireita[7] = parseFloat(e.target.value);
              setODArray(orelhaDireita);
            }}
          ></input>

          <button onClick={() => onSubD()}> Plotar</button>
        </div>
      </div>
    </div>
  );
}

export default Charts;
