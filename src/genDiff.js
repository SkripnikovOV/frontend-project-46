import _ from 'lodash';

const genDiff = (fileData1, fileData2) => {
    
    
    const keys1 = Object.keys(fileData1);
    const keys2 = Object.keys(fileData2);
    const allKeys = _.union(keys1, keys2);
    
    const diff = allKeys
        .sort()
        .map((key) => {
            if (!_.has(fileData2, key)) {
                return `  - ${key}: ${fileData1[key]}`;
            }
            if (!_.has(fileData1, key)) {
                return `  + ${key}: ${fileData2[key]}`;
            }
            if (fileData1[key] !== fileData2[key]) {
                return `  - ${key}: ${fileData1[key]}\n  + ${key}: ${fileData2[key]}`;
            }
            return `    ${key}: ${fileData1[key]}`;
        })
        .join('\n');
    
    return `{\n${diff}\n}`;
};

export default genDiff;
