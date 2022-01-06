import { Telegraf } from "telegraf";

import config from "../../config";

import log from "../../helpers/log";

const telegramBot = new Telegraf(config.token);

function initTelegramBot() {
    telegramBot.launch()
      
    log("The bot is initialized succesfuly \n");

    telegramBot.telegram.sendMessage(config.chatId, "Bot iniciado")
}

export {telegramBot, initTelegramBot}