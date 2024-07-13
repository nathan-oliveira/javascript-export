// generators-iterators
// qualquer duvida pesquisar pela classe Fibonacci no 01 - testing (spies)
const assert = require('assert')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello'
  yield 'World'
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next()) // { value: 'Hello', done: false }
// console.log(generator.next()) // { value: 'World', done: false }
// console.log(generator.next()) // { value: 200, done: false }
// console.log(generator.next()) // { value: undefined, done: true }

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })
assert.deepStrictEqual(Array.from(main()), ['Hello', 'World', 200, undefined])
assert.deepStrictEqual([...main()], ['Hello', 'World', 200, undefined])

// async iterators
const { readFile, stat, readdir } = require('fs').promises

// function* promisified() {
//   yield readFile(__filename)
//   yield Promise.resolve('Hey Dude')
// }

// ;(async () => {
//   for await (const item of promisified()) {
//      console.log(item.toString())
//   }
// })();

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield size

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log(item)
  }
})();

