const { describe, it } = require('mocha')
const { expect } = require('chai')

const TextProcessorFluentAPI = require('./../src/textProcessorFluentAPI.js')
const mock = require('./mock/valid.js')

describe('TextProcessorFluentAPI', () => {
  it('#builder', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    expect(result).to.be.deep.equal(mock)
  })

  it('#extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock)
      .extractPeopleData()
      .build()

    const expected = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a rua dos bobos, zero, bairro Alphaville, São Paulo.'
      ].join('\n')
    ]

    expect(result).to.be.deep.equal(expected)
  })
})
