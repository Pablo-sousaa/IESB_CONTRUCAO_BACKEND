const prompt = require('prompt-sync')();

let nome = prompt("Qual seu nome? ")

console.log ("Olá, " + nome)

let primeiro_numero = parseFloat(prompt("Digite o primeiro número: "));
let segundo_numero = parseFloat(prompt("Digite o segundo número: "));

let {soma, subtracao, multiplicacao, divisao, quadrado, raizQuad}= require('./Node')

console.log("Soma:", soma(primeiro_numero, segundo_numero));
console.log("Subtração:", subtracao(primeiro_numero, segundo_numero));
console.log("Multiplicação:", multiplicacao(primeiro_numero, segundo_numero));
console.log("Divisão:", divisao(primeiro_numero, segundo_numero));
console.log("Quadrado do primeiro:", quadrado(primeiro_numero));
console.log("Raiz do primeiro:", raizQuad(primeiro_numero));