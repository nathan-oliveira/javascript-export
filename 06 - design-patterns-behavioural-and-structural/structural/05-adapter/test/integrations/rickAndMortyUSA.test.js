import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import Character from '../../src/entities/character'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import axios from 'axios'

describe('#RickAndMortyUSA', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharactersFromXML should return a list of charater Entity', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml')
    const expected = [{"gender": "Male"}] //...resto do objeto

    jest.spyOn(axios, 'get').mockResolvedValue({ data: { response } })

    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toMatchObject(expected)
  })

  test('#getCharactersFromXML should return an empty list if the API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml')
    const expected = []
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { response } })

    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toStrictEqual(expected)
  })
})