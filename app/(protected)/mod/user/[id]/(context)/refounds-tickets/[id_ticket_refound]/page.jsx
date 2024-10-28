import { getTicketById } from "@/actions/getTicketById"
import BackButton from "@/components/buttons/BackButton";
import ModTicketAcceptRefound from "@/components/buttons/ModTicketAcceptRefound";

export default async function TicketRefoundPageMod({ params }) {
    const ticketData = await getTicketById(params.id_ticket_refound);
    return (
        <main className="p-4 min-h-screen  grid grid-rows-[max-content_1fr]">
            <BackButton />
            <div className="flex flex-col justify-between ">
                <div className="rounded-lg mt-4">
                    <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Moderación de Devolución de Ticket</h1>
                    <p className="mb-2"><strong>Ticket ID:</strong> {ticketData.id}</p>
                    <p className="mb-2"><strong>Usuario:</strong> {ticketData.user.name} {ticketData.user.lastname}</p>
                    <p className="mb-2"><strong>Producto:</strong> {ticketData.product.name}</p>
                    <p className="mb-2"><strong>Descripción:</strong> {ticketData.product.description}</p>
                    <p className="mb-2"><strong>Precio a reembolsar:</strong> ${ticketData.refoundPrice}</p>
                    {
                        ticketData.refunded && (
                            <div className="border border-green-border bg-green-background p-4 w-fit rounded-lg">
                                <p className="font-bold">Ticket Rembolsado !</p>
                            </div>
                        )
                    }
                </div>
                {
                    !ticketData.refunded && (
                        <ModTicketAcceptRefound ticket={ticketData}/>
                    )
                }
            </div>
        </main>
    )
}