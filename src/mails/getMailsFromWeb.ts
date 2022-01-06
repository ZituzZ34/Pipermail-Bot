import axios, { AxiosResponse } from "axios"
import fs from "fs"
import months from "../common/months"
import config from "../config/index"
import log from "../helpers/log"

async function getMailsFromWeb() : Promise<string[]> {
    const filesNameShort : string[] = []

    // Prepare Dates
    const today = new Date()
    const monthNow = today.getMonth()
    const yearNow = today.getFullYear()

    // Month - 1, because months start at 0
    let month = config.month - 1
    let year = config.year

    log(`Getting monthly mail files from: ${config.urlBase} (starting from: ${year}-${month})`);

    // const logicPassMonths : boolean = logicPassMonthsAndYears(month, monthNow, year, yearNow)

    while (((month <= monthNow && year == yearNow) || (year < yearNow))) {

        const filePath : string = `${config.dataRoute}${year}-${month + 1}.txt`

        const filePathSplit = filePath.split('/')

        const fileName = filePathSplit[filePathSplit.length - 1]

        if (fs.existsSync(filePath)) {
            log(`File ${filePath} already exists.`);
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

        log(`Saving mails to: ${config.dataRoute}/${fileName}`)

        filesNameShort.push(fileName)

        let failed = false

        log('Requesting url: ' + urlBase + '.txt');

        const monthMail : void | AxiosResponse<any, any> = await axios.get(urlBase + '.txt').catch(e => {
            console.error('404 get mails', e)
            failed = true
        })

        log(`Download ${urlBase + '.txt'} in ${filePath}`);

        const fileContent = monthMail?.data

        fs.writeFile(filePath, fileContent, (err) => {
            if (err) throw err;
            log("The file was succesfully download!");
        });

        month++
        if (month > 11) {
            year++
            month = 0
        }
    }

    return filesNameShort
}



export default getMailsFromWeb