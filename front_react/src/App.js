import './App.css';
import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import api from './api';

export default class App extends React.Component{

//const [number, setNumber] = useState(0);
//const [number2, setNumber2] = useState(0);
//const [result, setResult] = useState("");
  
//useEffect(() => {
//  api.get("/funcao/multi",json ).then(({data}) => {
//    console.log("entrei api");
//    setResult(data);
//  }).catch((err)=>{console.log(err)})
// }, [number, number2])

state = {number:0, number2:0, resultado:''}

salvarValor1 = event =>{
  this.setState({
    number:event.target.value
  })
}
salvarValor2 = event =>{
  this.setState({
    number2:event.target.value
  })
}

salvarResultado = event=>{
  this.setState({
    resultado:event.target.value
  });
}

enviarDados = event =>{
//alert("Alert");
//json = JSON.stringify({"int1": this.state.number, "int2": this.state.number2})
  api.post("/funcao/soma",{int1: this.state.number, int2: this.state.number2} ).then(({data}) => {
      this.setState({resultado:data});}).catch((err)=>{console.log(err)})
  event.preventDefault();
}

render(){
  return (
    
    <div className="App">
      <header className="App-header">
        <p>
         Trabalho TCC
        </p>
        <form onSubmit={this.enviarDados}>
            <label>
              Numero 1
            <input type="text" onChange={this.salvarValor1} />
            </label>
            <label>
              Numero 2
            <input type="text" onChange={this.salvarValor2} />
            </label>
            <input type="submit" value="Enviar" />
          </form >
          <p>Resultado: {this.state.resultado}</p>
          
      </header>
    </div>
  )
  }
}