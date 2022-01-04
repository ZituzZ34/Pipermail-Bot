import { getMails } from "./mails/getMailsFromWeb"

import "reflect-metadata"

import {createConnection} from "typeorm";

async function main() : Promise<void> {
    console.log("Init app");
    
    // Conecction to database
    const connection = createConnection()

    const files = await getMails()
    
    console.log(files)
}

main()