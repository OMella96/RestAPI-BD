'use strict'

let params = process.argv.slice(2)

let num1 = parseFloat(params[0])
let num2 = parseFloat(params[1])

let plantilla = `
La suma es : ${num1+num2}
La resta es : ${num1-num2}
La multiplicacion es : ${num1*num2}
La division es : ${num1/num2}
`

console.log(plantilla)