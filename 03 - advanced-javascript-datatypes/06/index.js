'use strict'

const Events = require('events')
const event = new Events()
const eventName = 'counter'

event.on(eventName, msg => console.log('counter updated', msg))
// event.emit(eventName, 'oi')
// event.emit(eventName, 'tchau')
const myCounter = {
  counter: 0
}
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    // console.log('chamou', { object, prop })
    return object[prop]
  },
})

// jajá e executa para sempre!
setInterval(function() {
  proxy.counter += 1
  if (proxy.counter === 10) clearInterval(this)
}, 200)

// futuro
// é uma MÁ PRATICA colocar como "0" - nextTick vai ser executado primeiro que o setTimeout
setTimeout(() => {
  proxy.counter = 4
}, 100)
// se quer que executa agora, deve usar:
setImmediate(() => {
  console.log('setImmediate', proxy.counter)
})

// executa agora, agorinha, mas acaba ccom o ciclo de vida do node,
// vai ser imterrompido a fila de execução do javascript e vai inserir essa execução no meio (tento priodidade total na execução do nodejs)
// é uma MÁ PRATICA
process.nextTick(() => {
  proxy.counter = 2
})
