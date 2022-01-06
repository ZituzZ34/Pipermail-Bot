import { Mail } from "../../models/Mail";
import { getRepository } from "typeorm";
import log from "../../helpers/log";

async function mailExistInDatabase(mailId : string) : Promise<boolean> {

    const MailRepository = getRepository(Mail)

    const mailInTheDatabase = await MailRepository.findOne({
        where: {
            mailId: mailId
        }
    })

    return mailInTheDatabase !== undefined

}

export default mailExistInDatabase