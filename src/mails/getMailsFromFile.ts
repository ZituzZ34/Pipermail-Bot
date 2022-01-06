import config from "../config";

const fs = require('fs')

import readMailsOfAMonth from "../core/readMailsOfAMonth";
import log from "../helpers/log";

async function getMailsFromFile(filesNamePaths : string[]) : Promise<void> {
    log("Get data from data files \n\n")
    
    for (let i = 0; i < filesNamePaths.length; i++) {
        const filePathAbsolute : string = config.dataRoute + filesNamePaths[i]
        
        
        fs.readFile(filePathAbsolute, 'utf8', async (error : Error, data : string) => {
            if (error) throw error;
            
            await readMailsOfAMonth(data, true)
        });
    }
}

export default getMailsFromFile
