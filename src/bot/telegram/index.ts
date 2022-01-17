import { Telegraf } from "telegraf";

import config from "../../config";

import log from "../../helpers/log";
import initHelpCommand from "./commands/help";


const telegramBot = new Telegraf(config.token);

function initTelegramBot() {
    log("Connecting bot to Telegram");
    
    telegramBot.launch()
    
    initHelpCommand(telegramBot);

    log("Bot connected to Telegram");
    
}

export {telegramBot, initTelegramBot}