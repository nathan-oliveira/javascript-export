import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from '@jest/globals'

import { tmpdir } from 'os'
import fsPromise from 'fs/promises'
import { join } from 'path'

import { createLayersIfNotExists } from './../../src/createLayers.js'

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromise.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration - Layers - Folders Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort(), // sort colocando pq o sistema retorna em ordem alfabetica
  }

  beforeAll(async () => {
    config.mainPath = await fsPromise.mkdtemp(join(tmpdir(), 'skeleton-'))
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromise.rm(config.mainPath, { recursive: true });
  });

  test('should not create folders if it exists', async () => {
    const beforeRun = await fsPromise.readdir(config.mainPath)

    await createLayersIfNotExists(config)
    const afterRun = await getFolders(config)
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  });

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await getFolders(config)
    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(afterRun).toEqual(beforeRun)
  });
});
