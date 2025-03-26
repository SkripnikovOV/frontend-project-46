import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const buildLines = (nodes, parentPath = '') => {
  const lines = nodes.flatMap((node) => {
    const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;
    
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return buildLines(node.children, currentPath);
      case 'unchanged':
        return [];
    }
  });
  
  return lines.join('\n');
};

const formatPlain = (diff) => buildLines(diff);

export default formatPlain;