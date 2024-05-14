import { getUserTicketBySeller } from "@/actions/getUserTicketBySeller";
import BackButton from "@/components/buttons/BackButton";
import { redirect } from "next/navigation";
import TicketContainer from "./TicketContainer";

export default async function UserTickets({ params }) {

    const usuarioTickets = await getUserTicketBySeller(params.id);

    if (!usuarioTickets) return redirect("/seller")


    const tickets = usuarioTickets.cart;

    console.log(tickets)
    return (
        <>
            <main className="p-4">
                <BackButton />
                <h1 className="font-bold text-2xl mt-4">Tickets "{usuarioTickets.name + " " + usuarioTickets.lastname}"</h1>
                <TicketContainer tickets={tickets} />
            </main>
        </>
    )
}