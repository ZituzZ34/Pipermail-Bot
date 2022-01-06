import "reflect-metadata";

import { Connection, createConnection } from "typeorm";
import { initTelegramBot } from "./bot/telegram";

import config from "./config";
import log from "./helpers/log";
import getMailsFromFile from "./mails/getMailsFromFile";
import getMailsFromWeb from "./mails/getMailsFromWeb";

async function updateFromMailingList(): Promise<void> {
    // Get mails from web and add to database all
    log("Updating from mailing list.")
    const files = await getMailsFromWeb()
    getMailsFromFile(files)
    log("Finished update from mailing list.")
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

    // Schedule periodic updates
    // FIXME: this should not use setInterval, but reschedule itself (end to start) and handle errors
    setInterval(async () => {
        await updateFromMailingList()
    }, config.timeToRefresh)
}

main()