import config from "../../../config"

import log from "../../../helpers/log"

import { telegramBot } from ".."

function sendMessage(text: string) {
    log("Sending notify mail to Telegram")

    telegramBot.telegram.sendMessage(config.chatId, text, {parse_mode: 'HTML'})
}

export default sendMessage