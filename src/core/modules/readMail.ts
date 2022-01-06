import { getRepository } from "typeorm"

import { Mail } from "../../models/Mail"

import mailExistInDatabase from "./mailExistInDatabase"

import getUrlList from "../../utils/get/getUrlList"

import formatDate from "../../utils/format/formatDate"

import config from "../../config"

import sendMessage from "../../bot/telegram/messages/notifyMail"

import log from "../../helpers/log"

async function readMail(monthMailsParsed : any, mail : any, notify : boolean) : Promise<boolean> {
    const { messageId, date, subject, from } = monthMailsParsed[mail]
    
    const MailRepository = getRepository(Mail)
    
    const existInDatabase = await mailExistInDatabase(messageId)
    if (existInDatabase) return true
    
    const dateParsed : number = Date.parse(date)
    
    log(`Insert mail: ${messageId}, ${dateParsed}, ${subject}`)

    const createMail : Mail = await MailRepository.create({mailId: messageId, date: dateParsed})
    await MailRepository.save(createMail)

    const now : Date = new Date();

    // Calculate the age of the mail
    const age = ((now.getTime() - dateParsed) / 1000 / 60 / 60)
    
    if (notify && age < config.ageMail) {
        
        log("New mail in the list")

        const link = getUrlList(date)
        

        // Prepare text to send
        const text : string = config.messageText
        .replace('{DATE}', formatDate(date))
        .replace('{FROM}', from.text)
        .replace('{SUBJECT}', subject.replaceAll('<','&lt;'))
        .replace('{LINK}', link)

        // Send Message
        sendMessage(text)
    }
    
    log(`\n\n`);

    return false
}

export default readMail