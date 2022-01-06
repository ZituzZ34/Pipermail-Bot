import log from "../helpers/log"
import formatMonthMails from "../utils/format/formatMonthMails"
import readMail from "./modules/readMail"


/**
 * Processes a whole month mails data in mbox format
 * @param mailsMonth a string that contains the full month mails in mbox format
 * @param notify whether to notify the target notify channel
 */
async function readMailsOfAMonth(mailsMonth : string, notify : boolean) {
    // Split mails in the file
    const monthMailsParsed = await formatMonthMails(mailsMonth)

    log(`Reading Mails of a month`)
    for (let mail = 0; mail < monthMailsParsed.length; mail++) {
        log(`Processing email ${mail + 1}/${monthMailsParsed.length} in mbox content.`)
        await readMail(monthMailsParsed, mail, notify)
    }
}

export default readMailsOfAMonth