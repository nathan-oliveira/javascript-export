import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter'

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromJSON.name,
    ).mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharaters()
    expect(result).toEqual([])
    expect(brlIntegration).toHaveBeenCalled()
  })
})