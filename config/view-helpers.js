import env from './environment.js';
import fs from 'fs';

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let  helper=(app)=>{
    app.locals.assetPath=function(filepath){
        if(env.name=='development'){
            return '/' + filepath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filepath];
    }
}

export default {helper};
