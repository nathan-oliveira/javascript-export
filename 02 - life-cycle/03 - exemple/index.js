const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter
counter2++
// counter vai ser "0" e counter2 vai ser "1"
// apenas copiou o valor (o endereço)

const item = { counter: 0 }
let item2 = item

// item.counter vai ser "1"

// tipo primitivo gera uma copia em memoria
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// tipo de referência copia o endereço de memória e aponta para o mesmo lugar
item2.counter++
deepStrictEqual(item, { counter: 1 })
item.counter++
deepStrictEqual(item2, { counter: 2 })