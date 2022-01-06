import log from "../helpers/log"
import formatMonthMails from "../utils/format/formatMonthMails"
import readMail from "./modules/readMail"


async function readMailsOfAMonth(mailsMonth : string, notify : boolean) {
    const monthMailsParsed = await formatMonthMails(mailsMonth)

    log(`Reading Mails of a month`)
    for (let mail = 0; mail < monthMailsParsed.length; mail++) {
        readMail(monthMailsParsed, mail, notify)
    }
}

export default readMailsOfAMonth