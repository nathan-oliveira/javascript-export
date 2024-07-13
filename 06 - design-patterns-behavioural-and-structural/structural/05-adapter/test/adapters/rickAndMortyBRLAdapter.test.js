import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharacters should be and adapter for RickAndMortyUSA.getCharactersFromXML', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name,
    ).mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharaters()
    expect(result).toEqual([])
    expect(brlIntegration).toHaveBeenCalled()
  })
})