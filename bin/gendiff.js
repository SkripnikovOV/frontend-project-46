#!/usr/bin/env node
import  { Command }  from 'commander';
import  getDiff  from '../src/index.js';
let program = new Command();
program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, options) => {
        getDiff(filepath1, filepath2, options.format);
    })
   

program.parse(process.argv)