import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';



const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  if (!content) {
    return ""
  }
  const ext = path.extname(absolutePath).toLowerCase().slice(1);
  
  switch (ext) {
    case 'json': return JSON.parse(content);
    case 'yml': 
    case 'yaml': return yaml.load(content);
  }
};

export default parseFile;