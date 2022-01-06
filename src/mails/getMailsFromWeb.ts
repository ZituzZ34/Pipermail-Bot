import fs from "fs"

import axios, { AxiosResponse } from "axios"

import log from "../helpers/log"

import months from "../common/months"

import config from "../config/index"
import logicPassMonthsAndYears from "../common/coreLogicPassMonths"


async function getMailsFromWeb() : Promise<string[]> {
    const filesNameShort : string[] = []

    log(`Getting mails from ${config.urlBase}`);
    
    // Prepare Dates
    const today = new Date()
    const monthNow = today.getMonth()
    const yearNow = today.getFullYear()
    
    // Month - 1, because months start at 0
    let month = config.month - 1
    let year = config.year
    
    // const logicPassMonths : boolean = logicPassMonthsAndYears(month, monthNow, year, yearNow)

    while (((month <= monthNow && year == yearNow) || (year < yearNow))) {
        
        const filePath : string = `${config.dataRoute}${year}-${month + 1}.txt`
        
        const filePathSplit = filePath.split('/')

        const fileName = filePathSplit[filePathSplit.length - 1]

        if (fs.existsSync(filePath)) {
            log(`The ${filePath} already has a file \n\n`);
            filesNameShort.push(fileName)
        } else {
            break;
        }
        
        month++
        if (month > 11) {
            year++
            month = 0
        }
    }
    
    while (((month <= monthNow && year == yearNow) || (year < yearNow))) {
        const filePath : string = `${config.dataRoute}${year}-${month + 1}.txt`
        
        //Url to get the mails
        const urlBase : string = `${config.urlBase}${year}-${months[month]}`
        
        const filePathSplit = filePath.split('/')

        const fileName = filePathSplit[filePathSplit.length - 1]

        log(`Saving mails in this file name ${fileName} with this ${config.dataRoute} \n\n`)

        filesNameShort.push(fileName)

        let failed = false
        
        log('Requesting url ' + urlBase + '.txt \n\n');
        
        const monthMail : void | AxiosResponse<any, any> = await axios.get(urlBase + '.txt').catch(e => {
            console.error('404 get mails', e)
            failed = true
        })
        
        log(`download ${urlBase + '.txt'} in ${filePath} \n\n`);
        
        const fileContent = monthMail?.data
        
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) throw err;
            log("The file was succesfully download! \n\n");
        });
        
        log(`\n\n`);
        
        
        month++
        if (month > 11) {
            year++
            month = 0
        }
    }

    return filesNameShort
}



export default getMailsFromWeb