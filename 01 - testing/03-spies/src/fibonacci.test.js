
const sinon = require('sinon')
const assert = require('assert')
const Fibonacci = require('./fibonacci')

// Fibonacci: o próximo valor corresponde à soma dos dois anteriores
// dado 3
// 0,1,1
// dado 5
// 0,1,1,2,3

;(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando funcoes .next, for await e rest/spread
    fibonacci.execute(3)
    console.log('callcount', spy.callCount)

    for await(const i of fibonacci.execute(3)) {}
    const expectedCallCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(3);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> PARA

    const { args } = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    })

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
})()
