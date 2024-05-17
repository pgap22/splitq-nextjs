import { getHistoryByCartId } from "@/actions/getHistoryByCartId"
import { authUser } from "@/lib/authUser"

export default async function HistoryPage(){
    const {id} = await authUser()
    await getHistoryByCartId(id);
    return(
        <p>xd</p>
    )
}