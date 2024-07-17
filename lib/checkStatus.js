import axios from "axios"

export async function checkStatus(url){
    try {
        const res = await axios(url)
        return !!res.data
    } catch (error) {
        return false
    }
}