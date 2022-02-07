const express = require('express');
const rotas = express.Router();
//const path = require('path');
const soma = require('../funcoes/soma.js');
const multi = require('../funcoes/multi.js');

rotas.post('/soma', (req,res)=>{

    const int1 = req.body.int1;
    const int2 = req.body.int2;
    const somado = soma(int1,int2);
    console.log(`executando função soma retornando valor: ${somado}`);
    res.send(`${somado}`);
});

rotas.post('/multi', (req,res)=>{
    const int1 = req.body.int1;
    const int2 = req.body.int2;

    const mult = multi(int1,int2);

    console.log(`executando função multi retornando valor: ${mult}`);
    res.send(`${mult}`);
})


module.exports = rotas;