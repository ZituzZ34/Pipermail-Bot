import log from "../helpers/log"
import formatMonthMails from "../utils/format/formatMonthMails"
import readMail from "./modules/readMail"


async function readMailsOfAMonth(mailsMonth : string, notify : boolean) {
    const monthMailsParsed = await formatMonthMails(mailsMonth)

    for (let mail = 0; mail < monthMailsParsed.length; mail++) {
        log(`Reading Mails of a month`)
        readMail(monthMailsParsed, mail, notify)
    }
}

export default readMailsOfAMonth