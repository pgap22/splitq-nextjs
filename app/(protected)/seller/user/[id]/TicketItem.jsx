"use client"
import clsx from "clsx"

export default function TicketItem({ ticket, selectedTickets, setSelectedTickets, user_id }) {
    const isEnabled = selectedTickets.some(ticketselected => ticketselected === ticket.id);
    const toggleEnabled = () => {
        if (isEnabled) {
            setSelectedTickets(selectedTickets.filter(ticketselected => ticketselected !== ticket.id));
            return
        }
        setSelectedTickets([...selectedTickets, ticket.id])
    }

    return (
        <div onClick={toggleEnabled} className={clsx(isEnabled && "bg-foreground", "border bg-background rounded transition-all border-border p-4 flex gap-2 items-center")}>
            <div className={clsx(isEnabled && "bg-text", "border border-border rounded w-6 aspect-square")}>

            </div>
            <div>
            <p>{ticket.product.name}</p>
            <p className="text-xs">Cantidad: <span className="font-bold">{ticket.quantity}</span></p>
            </div>
        </div>
    )
}