import getMailsFromFile from "./mails/getMailsFromFile";

import getMailsFromWeb from "./mails/getMailsFromWeb";

import config from "./config";

import { Connection } from "typeorm";

import "reflect-metadata"

import log from "./helpers/log";

import {createConnection} from "typeorm";
import { Mail } from "./models/Mail";
import { initTelegramBot } from "./bot/telegram";

async function main() : Promise<void> {


    log("Initialize app");
    // Conecction to database
    try {
        const connection : Connection = await createConnection()

        log("Connected to database \n");
    } catch (error) {
        throw error
    }

    initTelegramBot();

    // Get Mails to web and add to database all
    const files = await getMailsFromWeb()
    getMailsFromFile(files)

    setInterval(async () => {
        const files = await getMailsFromWeb()
        getMailsFromFile(files)
    }, config.timeToRefresh)
}

main()