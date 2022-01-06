import { Telegraf } from "telegraf";

import config from "../../config";

import log from "../../helpers/log";

const telegramBot = new Telegraf(config.token);

function initTelegramBot() {
    log("Connecting bot to Telegram");

    telegramBot.launch()
    telegramBot.telegram.sendMessage(config.chatId, "Pipermail-Telegram Bot iniciado")

    log("Bot connected to Telegram");

}

export {telegramBot, initTelegramBot}