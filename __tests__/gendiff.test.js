import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();
const normalize = (str) => str.replace(/\r\n/g, '\n').trim();
const formats = [
  ['stylish', 'expected.stylish'],
  ['plain', 'expected.plain'],
  ['json', 'expected.json'],
];

const filePairs = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.json', 'file2.yaml'],
];

describe('General diff tests', () => {
  test.each(formats)('complex structures in %s format', (format) => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yaml');
    const result = gendiff(file1, file2, format);
    const expected = readFixture(`expected.${format}`);
    if (format === 'json') {
      expect(() => JSON.parse(result)).not.toThrow();
      expect(JSON.parse(result)).toEqual(JSON.parse(expected));
    } else {
      expect(normalize(result)).toEqual(normalize(expected));
    }
  });

  test.each(filePairs)('%s vs %s', (file1, file2) => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const result = gendiff(path1, path2);
    const expected = readFixture('expected.stylish');
    expect(normalize(result)).toEqual(normalize(expected));
  });



  test('invalid format throws error', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yaml');
    expect(() => gendiff(file1, file2, 'invalid')).toThrow('Unknown format: invalid');
  });

  test('identical files', () => {
    const file = getFixturePath('file1.json');
    const result = gendiff(file, file, 'stylish');
    expect(result).toBe('');
  });
  test('one empty file', () => {
    const file1 = getFixturePath('empty.json');
    const file2 = getFixturePath('file2.json');
    expect(() => gendiff(file1, file2)).not.toThrow();
    const result = gendiff(file1, file2);
    expect(result).not.toBe('');
  });
});



