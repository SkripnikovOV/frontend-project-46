import fs from 'fs';
import path from 'path';


const readFile = (filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    
        const data = fs.readFileSync(fullPath, 'utf8');
       
        return data.toString();
    
};

const getdiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
      
        console.log(data1 + '\n' + data2);
        
    
};

export default getdiff;
