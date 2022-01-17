import "reflect-metadata";

import { Connection, createConnection } from "typeorm";
import { initTelegramBot } from "./bot/telegram";

import config from "./config";

import log from "./helpers/log";
import getMailsFromFile from "./mails/getMailsFromFile";
import getMailsFromWeb from "./mails/getMailsFromWeb";


async function updateFromMailingList(): Promise<void> {
    // Get mails from web and add to database all


    log(`Updating from mailing list ${new Date()}.`)
    const files = await getMailsFromWeb()
    await getMailsFromFile(files)
    log(`Finished update from mailing list ${new Date()}.`)
    
    // Schedule periodic updates
    setTimeout(async () => {
        await updateFromMailingList()
    }, config.timeToRefresh);
}

async function main() : Promise<void> {

    log("Initializing Pipermail to Telegram bot.")
    // Conection to database
    try {
        const connection : Connection = await createConnection()
        log("Connected to database.")
    } catch (error) {
        throw error
    }

    initTelegramBot()

    await updateFromMailingList()

}

main()