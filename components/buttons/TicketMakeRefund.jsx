"use client"
import { useTransition } from "react";
import { Button } from "../ui/button";
import { createTicketRefund } from "@/actions/createTicketRefund";
import { cancelTicketRefund } from "@/actions/cancelTicketRefound";

export default function TicketMakeRefund({ refoundActive, id_ticket, currentPrice }) {
    const [loading, startTransition] = useTransition();


    const makeTicketRefund = () => {
        startTransition(async () => {
            try {
                await createTicketRefund(id_ticket,currentPrice)
            } catch (error) {
                console.log("Hubo un error")
            }
        })
    }

    const quitTicketRefund = () => {
        startTransition(async () => {
            try {
                await cancelTicketRefund(id_ticket)
            } catch (error) {
                console.log(error)
            }
        })
    }

    if (refoundActive) return (
        <>
            <Button onClick={quitTicketRefund} disabled={loading} variant="destructive" className="w-full mt-4">Cancelar Rembolso</Button>
        </>
    )
    return (
        <>
            <Button onClick={makeTicketRefund} disabled={loading} className="w-full mt-4">Crear Rembolso</Button>
        </>
    )
}