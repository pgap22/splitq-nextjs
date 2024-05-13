import { getUserTicketBySeller } from "@/actions/getUserTicketBySeller";
import BackButton from "@/components/buttons/BackButton";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function UserTickets({ params }) {

    const usuarioTickets = await getUserTicketBySeller(params.id);

    if (!usuarioTickets) return redirect("/seller")

    console.log(usuarioTickets);

    const tickets = usuarioTickets.cart;
    return (
        <>
            <main className="p-4">
                <BackButton />
                <h1 className="font-bold text-2xl mt-4">Tickets "{usuarioTickets.name + " " + usuarioTickets.lastname}"</h1>
                <div className="mt-4 flex flex-col gap-2">
                    {
                        tickets.map(ticket => (
                            <div className="border border-border p-4">
                                <input type="checkbox" />
                                <p>{ticket.id}</p>
                            </div>
                        ))
                    }
                </div>
                <Button disabled className="fixed left-2 right-2 bottom-2">Confirmar entrega</Button>
            </main>
        </>
    )
}