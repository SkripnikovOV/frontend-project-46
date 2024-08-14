import fs from 'fs';
import path from 'path';
import  process  from 'process';
import genDiff from './genDiff.js';


const readFile = (filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    const data = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(data);
    
};

const getDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    const diff = genDiff(data1, data2);
    console.log(diff);
    
        
    
};

export default getDiff;
