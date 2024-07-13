// symbol

const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'
// console.log(user.userName)
// // sempre único em nivel de endereco de memoria
// console.log(user[Symbol('userName')])
// console.log(user[uniqueKey])

// é dificil de pegar, mas não é secreto
console.log('symbols', Object.getOwnPropertySymbols(user))

// byPass - má prática (nem tem no codebase do node)
// user[Symbol.for('password')] = 123
// user[Symbol.for('password')]

// Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o último e retorna
        value: this.items.pop()
      }
    }
  }),
}

// Symbol private
const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  // ver quando va fazer as conversões internamente - coercao explicita
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems].map(
      (item) => new Intl
        .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
        .format(item)
    )
    return new Intl
      .ListForm('pt-BR', { style: 'long', type: 'conjunction' })
      .format(items)
  }

  // iterator! O '*' valida de é operador
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  // iterator para trabalhar com promise
  async *[Symbol.asyncIterator]() {
    const tiemout = ms => new Promise((r) => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await tiemout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2018, 2, 2],
)

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2),
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)

// coercao explicita para chamar o toPrimitive
assert.deepStrictEqual(
  String(myDate),
  '01 de abril de 2020 e 02 de março de 2018',
)

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)
// ;(async () => {
//   for await(const item of myDate) {
//     console.log('asyncIterator => ', item)
//   }
//   // 2020-04-01T03:00:00.000Z
//   // 2020-03-02T03:00:00.000Z
// })()

;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})