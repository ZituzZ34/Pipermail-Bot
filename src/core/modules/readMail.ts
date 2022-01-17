import { getRepository } from "typeorm"
import sendMessage from "../../bot/telegram/messages/notifyMail"
import config from "../../config"
import log from "../../helpers/log"
import { Mail } from "../../models/Mail"
import formatDate from "../../utils/format/formatDate"
import getUrlList from "../../utils/get/getUrlList"
import mailExistInDatabase from "./mailExistInDatabase"


async function readMail(monthMailsParsed : any, mail : any, notify : boolean) : Promise<boolean> {
    const { messageId, date, subject, from } = monthMailsParsed[mail]

    const MailRepository = getRepository(Mail)

    const existInDatabase = await mailExistInDatabase(messageId)
    if (existInDatabase) {
        log(`Mail already exists in the database: ${messageId}`)
        return true
    }

    const dateParsed : number = Date.parse(date)

    log(`Inserting mail: ${messageId}, ${dateParsed}, ${subject}`)

    const createMail : Mail = await MailRepository.create({mailId: messageId, date: dateParsed})
    await MailRepository.save(createMail)

    const now : Date = new Date();

    // Calculate the age of the mail
    const age = ((now.getTime() - dateParsed) / 1000 / 60 / 60)

    if (notify && age < config.ageMail) {

        log(`Found new mail in the mailing list: ${messageId} (age: ${age}, notify: ${notify}, subject: ${subject})`)

        const link = getUrlList(date)

        
        const goodFrom : string = from.text.replace(config.fromEmailReplace, '@')

        // Prepare text to send
        const text : string = config.messageText
            .replace('{DATE}', formatDate(date))
            .replace('{FROM}', goodFrom)
            .replace('{SUBJECT}', subject.replaceAll('<','&lt;'))
            .replace('{LINK}', link)

        // Send Message
        sendMessage(text)
    }

    return false
}

export default readMail