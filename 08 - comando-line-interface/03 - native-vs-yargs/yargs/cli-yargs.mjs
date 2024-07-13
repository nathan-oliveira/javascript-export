#!/usr/bin/env node

// comando acima transformar em um executavel
// which node
// chmod +x c cli-yargs.mjs
// ./cli-yargs.mjs createHero -n Flash -a 55 -p Speed


import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })
const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        // demand: true,
        describe: 'hero name',
        type: 'string'
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        // demand: true,
        describe: 'hero age',
        type: 'number'
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        // demand: true,
        describe: 'hero name',
        type: 'number'
      })
      .example('createHero --name Flash --age 55 --power Speed', 'create a hero')
      .example('createHero -n Flash -a 55 -p Speed', 'create a hero')
  })
  .epilog('copyright 2021 - Nathan Oliveira')

// console.log(hero(argv)); // sem o command: node cli-yargs.mjs --name Nathan --age 26 --power ned

// com o command
// node cli-yargs.mjs --help
// node cli-yargs.mjs createHero -n Flash -a 55 -p Speed
console.log(hero(argv))
