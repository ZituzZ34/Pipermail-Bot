import months from "../../common/months"

import config from "../../config"

function getUrlList(date : Date) : string {

    const year = date.getFullYear()

    const month = months[date.getMonth()]

    const urlFormat = `${config.urlBase}${year}-${month}/${config.sufixUrlBase}`

    return urlFormat
}

export default getUrlList