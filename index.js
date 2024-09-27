const express = require('express'); // inicia o express
const app = express(); // atribiu a variavel app para o express

const calculadoraIMC = require('./calculadoraIMC'); //importa a função de outro lugar


app.get('/', (req, res) => { // é como é feito a api enviando por um get
   let peso = req.query.peso; // atribuindo o que foi recebido por http a variaveis
   let altura = req.query.altura; // atribuindo o que foi recebido por http a variaveis
   
   if(calculadoraIMC.validaParametro(req.query.peso) && calculadoraIMC.validaParametro(req.query.altura)){ // validação de informações recebidas
    let imc = calculadoraIMC.efetuarCalculoIMC(peso,altura);
    let status = calculadoraIMC.retornaStatusIMC(imc);
 
    let json = {imc: imc, status: status} //atribuidos resultados em uma variavel trasformada em json
 
    res.json(json); //enviando resultados por um json
   } else { 
    res.status(400).json({'Erro':'Peso ou altura inválidos'});
   }
});

app.listen(8080, () => { 
    let data = new Date();

    console.log('Servidor node iniciado em: '+ data)
});  