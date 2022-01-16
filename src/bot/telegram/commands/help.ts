

import { Context, Telegraf } from "telegraf";
import { Update } from "typegram";
import log from "../../../helpers/log"

function initHelpCommand(telegramBot : Telegraf<Context<Update>>) {
    telegramBot.help((ctx) => {
        log(`Start bot to this channel ${ctx.update.message.chat.id}`)
        ctx.reply("Welcome");
    })
}

export default initHelpCommand
