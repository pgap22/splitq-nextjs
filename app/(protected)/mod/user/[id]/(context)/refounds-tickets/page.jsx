import getTicketsRefound from "@/actions/getTicketsRefound";
import BackButton from "@/components/buttons/BackButton";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineLocalActivity } from "react-icons/md";

export default async function RefoundTicketsMod({ params }) {
    const tickets = await getTicketsRefound(params.id)
    console.log(tickets)
    return (
        <main className="p-4">
            <BackButton />
            <div className="mt-4">
                <h1 className="text-xl font-bold">Tickets en Rembolso</h1>
                <div className="mt-4">
                    {
                        tickets.map(ticket => (
                            <Link key={ticket.id} href={"refounds-tickets/"+ticket.id}>
                                <div className="bg-foreground flex items-center gap-2 p-4 rounded-md border border-border">
                                    <IconBox isButton={false} Icon={MdOutlineLocalActivity} variant="square" />
                                    <p className="font-bold">{ticket.product.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}