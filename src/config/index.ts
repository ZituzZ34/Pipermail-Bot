import Iconfig from "./types/Iconfig"

import fs from "fs"
import log from "../helpers/log"

let config : Iconfig = <Iconfig>{}

function readConfigJson () {
    log("Reading config.json")

    const data = fs.readFileSync("./config.json")

    config = JSON.parse(data.toString())
}

readConfigJson()

export default config