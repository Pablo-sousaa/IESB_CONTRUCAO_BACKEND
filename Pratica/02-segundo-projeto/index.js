let prompt = require('prompt-sync') ()

let nome = prompt("Qual seu nome? ")

console.log("Olá, " + nome)

    
let {calcularNotaA1,calcularNotaA2,calcularNotaFinal}= require('./calcularNota')

console.log("### Calculando nota A1 ###")

let exercicioA1 = parseFloat(prompt("Qual sua nota de exercício? "))
let trabalhoa1 = parseFloat(prompt("Qual sua nota de trabalho? "))
let provaA1 = parseFloat(prompt("Qual sua nota de prova? "))
let notaA1 = calcularNotaA1 (exercicioA1,trabalhoa1,provaA1)

console.log ("Nota A1 calculada: " + notaA1)
console.log ("### Finalizado cálculo A1 ###")

console.log("### Calculando nota A2 ###")

let exercicioA2 = parseFloat(prompt("Qual sua nota de exercício? "))
let trabalhoA2 = parseFloat(prompt("Qual sua nota de trabalho? "))
let provaA2 = parseFloat(prompt("Qual sua nota de prova? "))
let notaA2 = calcularNotaA1 (exercicioA2,trabalhoA2,provaA2)

media = calcularNotaFinal(notaA1, notaA2)

console.log ("Média Final: " + media)
