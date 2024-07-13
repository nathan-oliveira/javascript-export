#!usr/bind/env node

// chmod +x index.js
// npm link
// npm unlink -g codegen
// npm link


import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('skeleton', 'create project skeleton', (builder) => {
    return builder
      .option('componentName', {
        alias: 'c',
        demandOption: true,
        describe: 'component\'s name',
        type: 'array'
      })
      .example('skeleton --componentName product', 'create a project with a single domain')
      .example('skeleton -c product -c person -c colors', 'creates a project with a list of domain')
  })
  .epilog('copyright - nathan')

// npm start skeleton -c product -c person -c colors

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src';

const layers = ['repository', 'service', 'factory'].sort()
const config = {
  layers,
  defaultMainFolder,
  mainPath: '.',
}

await createLayersIfNotExists(config)
const pendingPromises = []

for(const domain of componentName) {
  const result = createFiles({ ...config, componentName: domain })
  pendingPromises.push(result)
}

await Promise.all(pendingPromises)
