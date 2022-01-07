import config from "../config";

import fs from 'fs'

import readMailsOfAMonth from "../core/readMailsOfAMonth";
import log from "../helpers/log";

/**
 * Processes a list of monthly mailbox files.
 * @param filesNamePaths array mbox file paths.
 */
async function getMailsFromFile(filesNamePaths : string[]) : Promise<void> {
    log(`Getting data from ${filesNamePaths.length} data files.`)

    for (let i = 0; i < filesNamePaths.length; i++) {
        const filePath : string = config.dataRoute + filesNamePaths[i]

        const data = await fs.promises.readFile(filePath, 'utf8')

        await readMailsOfAMonth(data, true)
    }
}

export default getMailsFromFile
