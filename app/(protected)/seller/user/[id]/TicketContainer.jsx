"use client"
import { Button } from "@/components/ui/button";
import TicketItem from "./TicketItem";
import { useState, useTransition } from "react";
import multiConfirmTickets from "@/actions/multiConfirmTickets";

import { socket } from "@/lib/socketio";
import { useEffect } from "react";

export default function TicketContainer({ tickets, user_id }) {
    const [selectedTickets, setSelectedTickets] = useState([])
    const [loading, startConfirming] = useTransition();
    
    

    useEffect(()=>{
        socket.emit("ticket-room", user_id)
    },[])

    const confirmAllTickets = ()=>{
        startConfirming(async()=>{
            const result = await multiConfirmTickets(selectedTickets)
            socket.emit("ticket-redeem", {tickets: result, room: user_id})
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
                        ticket={ticket} 
                        user_id={user_id}
                        />
                    )
                }
            </div>
            <Button onClick={confirmAllTickets} disabled={!selectedTickets.length || loading} className="fixed left-2 right-2 bottom-2">Confirmar entrega</Button>
        </>
    )
}