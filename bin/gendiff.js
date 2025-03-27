#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const diff = gendiff(filepath1, filepath2, options.format = 'stylish');
    console.log(diff);
  });

program.parse();