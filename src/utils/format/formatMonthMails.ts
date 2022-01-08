import parse from "parse-email"
import log from "../../helpers/log"

async function formatMonthMails(mails : string) : Promise<any> {

    // TODO: This split is not correct
    const mailsSeparated = mails.split("\nFrom ")

    const mailsFormatPromises = mailsSeparated.map(mail => {
        return parse(mail)
    })

    const mailsFormat = await Promise.all(mailsFormatPromises)

    console.log("mailsFormat", mailsFormat[0])

    return mailsFormat
}

export default formatMonthMails