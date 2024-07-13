// npm i -D rewiremock
const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// poderia estar em outro arquivo
const dbData = [{ name: 'Nathan Oliveira' }, { name: 'Fulano' }]
class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

;(async () => {
  {
    const expected = [{ name: 'NATHAN OLIVEIRA' }, { name: 'FULANO' }]
    rewiremock.enable()

    const UserFactory = require('../src/factory/userFactory')
    const userFactory = UserFactory.createInstance()
    const result = await userFactory.find()

    deepStrictEqual(result, expected)
    rewiremock.disable()
  }

  {
    const expected = [{ name: 'NATHAN OLIVEIRA' }]

    const UserFactory = require('../src/factory/userFactory')
    const userFactory = UserFactory.createInstance()
    const result = await userFactory.find()

    deepStrictEqual(result, expected)
  }
})()
