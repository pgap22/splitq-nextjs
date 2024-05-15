"use client"
import { Button } from "@/components/ui/button";
import TicketItem from "./TicketItem";
import { useState, useTransition } from "react";
import multiConfirmTickets from "@/actions/multiConfirmTickets";

export default function TicketContainer({ tickets }) {
    const [selectedTickets, setSelectedTickets] = useState([])
    const [loading, startConfirming] = useTransition();
    
    const confirmAllTickets = ()=>{
        startConfirming(async()=>{
            const result = await multiConfirmTickets(selectedTickets)
            setSelectedTickets([]);
        })
    }
    return (
        <>
            <div className="mt-4 flex flex-col gap-2">
                {
                    tickets.map(ticket => <TicketItem
                        setSelectedTickets={setSelectedTickets}
                        selectedTickets={selectedTickets}
                        ticket={ticket} />
                    )
                }
            </div>
            <Button onClick={confirmAllTickets} disabled={!selectedTickets.length || loading} className="fixed left-2 right-2 bottom-2">Confirmar entrega</Button>
        </>
    )
}