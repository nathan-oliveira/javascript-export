import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'

import fsPromise from 'fs/promises'
import fs from 'fs'

import { createFiles } from '../../src/createFiles.js';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['service', 'factory', 'repository'];
  const config = {
    layers: defaultLayers,
    mainPath: './',
    defaultMainFolder: 'src',
    componentName: 'heroes',
  };

  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent'],
    };

    const expected = { error: 'the chosen layer doesnt have a template' }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
  });

  test('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config, layers: ['repository'] };

    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
  })

  test('service should have repository as dependency', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config, layers: ['repository', 'service'] };

    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
  })

  test('factory should have repository and service as dependency', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config };

    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.factoryTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer, serviceLayer)
  })
});
