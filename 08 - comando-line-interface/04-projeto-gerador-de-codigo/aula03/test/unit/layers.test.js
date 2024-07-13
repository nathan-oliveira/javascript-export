import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js';
import fsPromise from 'fs/promises'
import fs from 'fs'

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['service', 'factory', 'repository']

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should create folders if it doesnt exist', async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fsPromise, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  test('should not create folders if it exist', async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fsPromise, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromise.mkdir).not.toHaveBeenCalled()
  });
});
