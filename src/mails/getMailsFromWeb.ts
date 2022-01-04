import fs from "fs"

import axios, { AxiosResponse } from "axios"

import log from "../helpers/log"

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']

import config from "../config/index"
import logicPassMonthsAndYears from "../common/coreLogicPassMonths"


async function getMails() : Promise<string[]> {
    const filesPathSort : string[] = []

    log(`Getting mails from ${config.urlBase}`);
    
    // Prepare Dates
    const today = new Date()
    const monthNow = today.getMonth()
    const yearNow = today.getFullYear()
    
    // Month - 1, because months start at 0
    let month = config.month - 1
    let year = config.year
    
    const logicPassMonths : boolean = logicPassMonthsAndYears(month, monthNow, year, yearNow)

    while (logicPassMonths) {
        
        const filePath : string = `${config.dataRoute}/${year}-${month + 1}.txt`
        
        if (fs.existsSync(filePath)) {
            log(`The ${filePath} already has a file`);
        } else {
            break;
        }
        
        month++
        if (month > 11) {
            year++
            month = 0
        }
    }
    
    while (logicPassMonths) {
        const filePath : string = `${config.dataRoute}${year}-${month + 1}.txt`
        
        //Url to get the mails
        const urlBase : string = `${config.urlBase}${year}-${months[month]}`
        
        const filePathSplit = filePath.split('/')
        filesPathSort.push(filePathSplit[filePathSplit.length - 1])

        let failed = false
        
        log('Requesting url ' + urlBase + '.txt');
        
        const monthMail : void | AxiosResponse<any, any> = await axios.get(urlBase + '.txt').catch(e => {
            console.error('404 get mails', e)
            failed = true
        })
        
        log(`download ${urlBase + '.txt'} in ${filePath}`);
        
        const fileContent = monthMail?.data
        
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) throw err;
            log("The file was succesfully download!");
        });
        
        log(`\n\n`);
        
        
        month++
        if (month > 11) {
            year++
            month = 0
        }
    }

    return filesPathSort
}



export {getMails, months}