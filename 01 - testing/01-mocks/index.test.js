const { rejects, deepStrictEqual } = require('assert')
const { error } = require('./src/constants')
const File = require('./src/file');

;(async() => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/fourItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Nathan",
        "id": 123,
        "profession": "Javascript Developer",
        "age": new Date().getFullYear() - 24
      },
      {
        "name": "Fulano",
        "id": 332,
        "profession": "Javascript Developer",
        "age": new Date().getFullYear() - 70
      },
      {
        "name": "Ciclano",
        "id": 321,
        "profession": "Javascript Developer",
        "age": new Date().getFullYear() - 30
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
