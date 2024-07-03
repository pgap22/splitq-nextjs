import { getTotalSellerTickets } from "@/actions/getTotalSellerTickets"
import { authUser } from "@/lib/authUser"

export default async function HistoryPage(){
    const {id} = await authUser()
    await getTotalSellerTickets(id);
    return(
        <p>xd</p>
    )
}