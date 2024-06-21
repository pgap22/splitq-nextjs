import axios from "axios"
export async function statusImgServer() {
    try {
        return await axios.get(process.env.API_IMAGE_LOCAL)
    } catch (error) {
        return {data: {ok: 0}}
    }
}
export async function statusSocketIO() {
    try {
        return await axios.get(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER)
    } catch (error) {
        return {data: {ok: 0}}
    }
}