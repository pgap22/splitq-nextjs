import { getTotalSellerTickets } from "@/actions/getTotalSellerTickets"

export default async function HistoryPage(){
    await getTotalSellerTickets();
    return(
        <p>xd waaaaaa seeeee</p>
    )
}