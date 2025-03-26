import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish': return formatStylish;
    case 'plain': return formatPlain;
    case 'json': return formatJson;
    default: throw new Error(`Unknown format: ${format}`);
  }
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  if (filepath1 === filepath2) {
    return "";
  }
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = buildDiff(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default gendiff;
