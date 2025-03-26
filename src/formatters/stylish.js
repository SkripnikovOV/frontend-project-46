import _ from 'lodash';

const stringify = (value, depth = 1) => {
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize - 2);
    const bracketIndent = ' '.repeat((depth - 1) * indentSize);
  
    if (!_.isObject(value)) return value;
  
    const lines = Object.entries(value)
      .map(([k, v]) => `${currentIndent}  ${k}: ${stringify(v, depth + 1)}`);
  
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  
  const formatStylish = (diff, depth = 1) => {
    const indent = ' '.repeat((depth * 4) - 4);
    const lines = diff.flatMap((node) => {
      // Добавим сортировку по ключам
      if (node.type === 'nested') {
        node.children.sort((a, b) => a.key.localeCompare(b.key));
      }
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
            `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
          ];
        case 'nested':
          return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      }
    });
  
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  
  export default formatStylish;