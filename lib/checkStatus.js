import axios from "axios"

export async function checkStatus(url,config){
    try {
        const res = await axios(url, config)
        return !!res.data
    } catch (error) {
        return false
    }
}