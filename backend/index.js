const express = require('express');
const rotaFuncoes = require('./rotas/funcoes.js');
const app = express();
const port = 3001;
const cors = require('cors');


app.use(cors());

app.listen(port, ()=>{
    console.log(`Ouvindo Porta ${port}`);
})

//ler o body da req
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());



app.use('/funcao', rotaFuncoes);






